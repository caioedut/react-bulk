import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { InputPinProps } from '../../types';
import defined from '../../utils/defined';
import pick from '../../utils/pick';
import string from '../../utils/string';
import BoxFactory from '../BoxFactory';
import GridFactory from '../GridFactory';
import InputFactory from '../InputFactory';

const InputPinFactory = React.memo<InputPinProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.InputPin;

    // Extends from default props
    let {
      autoFocus,
      defaultValue,
      length = 0,
      name,
      placeholder,
      returnKeyType,
      secure,
      size,
      type,
      value,
      // Events
      onChange,
      onSubmit,
      // Styles
      variants,
      inputStyle,
      ...rest
    } = factory2<InputPinProps>(props, options);

    const resolveValue = useCallback(
      (value) => {
        value = string(value).replace(/[^0-9a-zA-Z]/g, '');

        if (type === 'alphabetic') {
          value = value.replace(/[^a-zA-Z]/g, '');
        }

        if (type === 'numeric') {
          value = value.replace(/\D/g, '');
        }

        return value.slice(0, length);
      },
      [type, length],
    );

    const inputRefs = useRef<any>([]);
    const keydownRef = useRef(false);
    const [focused, setFocused] = useState(-1);

    const [digits, _setDigits] = useState<string[]>(resolveValue(defaultValue ?? value).split(''));

    const setDigits: typeof _setDigits = useCallback(
      (value) => {
        _setDigits((current) => {
          const newValue = [...(value instanceof Function ? value(current) : value)];

          while (newValue.length < length) {
            newValue.push('');
          }

          return newValue.slice(0, length);
        });
      },
      [length],
    );

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 1.25,
        small: 1.75,
        medium: 2.25,
        large: 2.75,
        xlarge: 3.25,
      });
    }

    const inputSize = theme.rem(size as number);

    inputStyle = [
      {
        textAlign: 'center',
        px: 0,
        flex: 0,
        h: inputSize,
        w: inputSize,
      },

      inputStyle,
    ];

    useEffect(() => {
      if (typeof value === 'undefined') return;
      setDigits(value);
    }, [value]);

    const handleKey = (event, index: number) => {
      const { key } = event.nativeEvent;

      // Ignore modifier keys
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      let digitValue;
      let focusInput;

      if (key === 'Home') {
        focusInput = inputRefs.current?.[0];
      }

      if (key === 'End') {
        focusInput = inputRefs.current?.[length - 1];
      }

      if (key === 'PageUp') {
        focusInput = inputRefs.current?.[Math.max(index - 2, 0)];
      }

      if (key === 'PageDown') {
        focusInput = inputRefs.current?.[Math.min(index + 2, length - 1)];
      }

      if (['ArrowLeft', 'ArrowUp'].includes(key)) {
        focusInput = inputRefs.current?.[index - 1];
      }

      if (['ArrowRight', 'ArrowDown'].includes(key)) {
        focusInput = inputRefs.current?.[index + 1];
      }

      if (['Backspace', 'Delete'].includes(key)) {
        digitValue = '';
        focusInput = inputRefs.current?.[index - 1];
      }

      // Char typed
      if (key.length === 1) {
        const resolvedValue = resolveValue(key);

        if (resolvedValue) {
          digitValue = resolvedValue;
          focusInput = inputRefs.current?.[index + 1];
        }
      }

      if (defined(focusInput)) {
        focusInput.focus();
      }

      if (defined(digitValue)) {
        keydownRef.current = true;

        setDigits((current) => {
          current[index] = digitValue;
          return [...current];
        });
      }
    };

    const handleChange = (event, index) => {
      if (keydownRef.current) {
        keydownRef.current = false;
        return;
      }

      const newDigits = resolveValue(event.value).split('');

      if (newDigits.length) {
        const focusIndex = Math.min(length - 1, index + newDigits.length);
        inputRefs.current?.[focusIndex]?.focus();

        setDigits((current) => {
          newDigits.forEach((newDigit, newDigitIndex) => {
            current[index + newDigitIndex] = newDigit;
          });

          return [...current];
        });
      }
    };

    return (
      <BoxFactory ref={ref} stylist={[variants.root, stylist]} {...rest}>
        <InputFactory
          hidden
          name={name}
          secure={secure}
          value={digits.join('')}
          onChange={onChange}
          _internalTriggerChange
        />

        <GridFactory row noWrap gap>
          {Array.from({ length }).map((_, index) => {
            const next = inputRefs.current?.[index + 1];

            return (
              <BoxFactory key={index}>
                <InputFactory
                  ref={($el) => (inputRefs.current[index] = $el)}
                  caretHidden
                  controlled
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  autoFocus={autoFocus && index === 0}
                  inputMode={type === 'numeric' ? 'numeric' : 'text'}
                  inputStyle={inputStyle}
                  placeholder={focused === index ? undefined : placeholder?.[index]}
                  returnKeyType={next ? 'next' : returnKeyType}
                  secure={secure}
                  size={size}
                  value={digits[index]}
                  onChange={(e) => handleChange(e, index)}
                  onSubmit={next ? () => next.focus() : onSubmit}
                  onFocus={() => setFocused(index)}
                  onBlur={() => setFocused(-1)}
                  platform={{
                    web: { onKeyDown: (e) => handleKey(e, index) },
                    native: { onKeyPress: (e) => handleKey(e, index) },
                  }}
                />
              </BoxFactory>
            );
          })}
        </GridFactory>
      </BoxFactory>
    );
  }),
);

InputPinFactory.displayName = 'InputPinFactory';

export default InputPinFactory;
