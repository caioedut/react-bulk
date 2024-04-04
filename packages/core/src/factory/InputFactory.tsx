import React, { forwardRef, useCallback } from 'react';

import useDefaultRef from '../hooks/useDefaultRef';
import useInput from '../hooks/useInput';
import useTheme from '../hooks/useTheme';
import ChevronDown from '../icons/ChevronDown';
import ChevronUp from '../icons/ChevronUp';
import factory2 from '../props/factory2';
import getSize from '../props/getSize';
import { InputProps, InputValue } from '../types';
import defined from '../utils/defined';
import global from '../utils/global';
import BoxFactory from './BoxFactory';
import ButtonFactory from './ButtonFactory';
import InputBaseFactory from './InputBaseFactory';

const InputFactory = React.memo<InputProps>(
  forwardRef(({ ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Input;
    const { svg } = global.mapping;

    // Extends from default props
    let {
      color,
      defaultValue,
      disabled,
      endAddon,
      error,
      mask,
      max,
      maxLength,
      min,
      name,
      notNull,
      readOnly,
      size,
      type,
      unmask,
      value,
      // Events
      onChange,
      onFocus,
      onBlur,
      onSubmit,
      onFormChange,
      // Styles
      variants,
      style,
      ...rest
    } = factory2<InputProps>(props, options);

    const inputRef = useDefaultRef<any>(ref);

    const unmaskValue = useCallback(
      (value) => {
        let emptyValue: InputValue = '';

        if (maxLength) {
          value = `${value ?? ''}`.substring(0, maxLength);
        }

        // Number parser
        if (type === 'number') {
          emptyValue = 0;

          if (value) {
            value = Number(value);
          }

          if (defined(value)) {
            if (defined(min) && value < (min as number)) {
              value = min;
            }

            if (defined(max) && value > (max as number)) {
              value = max;
            }
          }
        }

        if (typeof unmask === 'function') {
          value = unmask(value);
        }

        if (!notNull && [undefined, null, NaN, ''].includes(value)) {
          return null;
        }

        return value ?? emptyValue;
      },
      [maxLength, type, unmask, notNull, min, max],
    );

    const input = useInput({
      name,
      value,
      defaultValue,
      error,
      editable: !disabled && !readOnly,
      mask,
      unmask: unmaskValue,
      onChange: (event, value) => dispatchEvent('change', event, onChange, value),
      onFormChange,
    });

    size = getSize(size);
    color = theme.color(input.error ? 'error' : color!);

    const focus = useCallback(() => inputRef?.current?.focus?.(), [inputRef]);
    const blur = useCallback(() => inputRef?.current?.blur?.(), [inputRef]);
    const clear = useCallback(() => input.clear(), [input]);
    const reset = useCallback(() => input.reset(), [input]);
    const isFocused = useCallback(
      () => Boolean(inputRef?.current?.isFocused?.()) || inputRef?.current === document?.activeElement,
      [inputRef],
    );

    function dispatchEvent(type, event, handler?, value?) {
      if (typeof handler !== 'function') return;

      value = typeof value === 'undefined' ? input.state : value;

      const form = input.form;
      const target = inputRef.current;
      const nativeEvent = event?.nativeEvent ?? event ?? null;

      return handler?.({ type, value, name, form, focus, blur, clear, reset, isFocused, target, nativeEvent }, value);
    }

    function handleFocus(event) {
      dispatchEvent('focus', event, onFocus);
    }

    function handleBlur(event) {
      dispatchEvent('blur', event, onBlur);
    }

    function handleSubmit(event) {
      dispatchEvent('submit', event, onSubmit);
    }

    function handleIncDec(event, signal) {
      if (disabled || readOnly) return;
      input.setState(Number(input.state || 0) + (signal || 1), event);
    }

    return (
      <InputBaseFactory
        ref={inputRef}
        style={style}
        variants={variants}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        color={color}
        disabled={disabled}
        maxLength={maxLength}
        readOnly={readOnly}
        size={size}
        type={type}
        error={input.error}
        {...input.props}
        endAddon={
          <BoxFactory row noWrap center>
            {type === 'number' && (
              <BoxFactory mr={endAddon ? 1 : -1}>
                {[+1, -1].map((item) => {
                  const isInc = item > 0;
                  const Icon = isInc ? ChevronUp : ChevronDown;

                  return (
                    <ButtonFactory
                      key={item}
                      variant="text"
                      color={color}
                      size={size / 2}
                      disabled={disabled}
                      h="50%"
                      p={0}
                      accessibility={{ label: isInc ? 'plus' : 'minus' }}
                      contentStyle={{ align: isInc ? 'end' : 'start' }}
                      onPress={(e) => handleIncDec(e, item)}
                    >
                      <Icon svg={svg} size={Math.round(theme.rem(size) * 0.45)} color={color} />
                    </ButtonFactory>
                  );
                })}
              </BoxFactory>
            )}

            {endAddon}
          </BoxFactory>
        }
      />
    );
  }),
);

InputFactory.displayName = 'InputFactory';

export default InputFactory;
