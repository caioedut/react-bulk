import React, { forwardRef, useCallback, useRef, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { InputPinProps } from '../../types';
import defined from '../../utils/defined';
import global from '../../utils/global';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import GridFactory from '../GridFactory';
import InputFactory from '../InputFactory';

const InputPinFactory = React.memo<InputPinProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.InputPin;
    const { web } = global.mapping;

    // Extends from default props
    let {
      autoFocus,
      length = 0,
      name,
      returnKeyType,
      size,
      // Events
      onChange,
      onSubmit,
      // Styles
      variants,
      inputStyle,
      ...rest
    } = factory2<InputPinProps>(props, options);

    const inputRefs = useRef<any>([]);

    const [digits, _setDigits] = useState<string[]>([]);

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
        digitValue = key;
        focusInput = inputRefs.current?.[index + 1];
      }

      if (defined(focusInput)) {
        focusInput.focus();
      }

      if (defined(digitValue)) {
        setDigits((current) => {
          current[index] = digitValue;
          return [...current];
        });
      }
    };

    const handlePaste = (event, index: number) => {
      console.log(event);

      if (web) {
        const newDigits = (event.clipboardData.getData('Text') ?? '').trim().split('');

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
      }
    };

    return (
      <BoxFactory ref={ref} stylist={[variants.root, stylist]} {...rest}>
        <InputFactory name={name} type="hidden" value={digits.join('')} onChange={onChange} _internalTriggerChange />

        <GridFactory row noWrap gap>
          {Array.from({ length }).map((_, index) => {
            const next = inputRefs.current?.[index + 1];

            return (
              <BoxFactory key={index}>
                <InputFactory
                  ref={($el) => (inputRefs.current[index] = $el)}
                  controlled
                  caretHidden
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  autoFocus={autoFocus && index === 0}
                  inputStyle={inputStyle}
                  maxLength={1}
                  returnKeyType={next ? 'next' : returnKeyType}
                  size={size}
                  value={digits[index]}
                  onPaste={(e) => handlePaste(e, index)}
                  onSubmit={next ? () => next.focus() : onSubmit}
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
