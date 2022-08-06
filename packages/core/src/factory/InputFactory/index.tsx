import React, { useCallback, useEffect, useRef, useState } from 'react';

import { crypt, useTheme, uuid } from '@react-bulk/core';

import get from '../../props/get';
import { InputProps } from '../../types';
import clsx from '../../utils/clsx';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import GroupFactory from '../GroupFactory';

function InputFactory(
  {
    // Html
    id,
    className,
    autoFocus,
    defaultValue,
    name,
    placeholder,
    readOnly,
    type,
    value,
    // Custom
    secure,
    // Bindings
    onChange,
    onFocus,
    onBlur,
    // Styles
    style,
    // Core
    map,
    ...rest
  }: InputProps | any,
  ref: any,
) {
  const theme = useTheme();
  const { web, Input, Label } = map;
  const classes: any[] = ['rbk-input', className];

  const defaultRef: any = useRef(null);
  const inputRef = ref || defaultRef;

  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState(`${defaultValue ?? ''}`);

  id = id ?? `rbk-${crypt(uuid())}`;

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setInternal(value);
    }
  }, [value]);

  const focus = useCallback(() => {
    inputRef?.current?.focus?.();
  }, [inputRef]);

  const blur = useCallback(() => {
    inputRef?.current?.blur?.();
  }, [inputRef]);

  const clear = useCallback(() => {
    setInternal(`${defaultValue ?? ''}`);
  }, []);

  const isFocused = useCallback(() => {
    return inputRef?.current?.isFocused?.() || inputRef?.current === document?.activeElement;
  }, [inputRef]);

  const handleChange = (e) => {
    const target = inputRef?.current;
    const nativeEvent = e?.nativeEvent ?? e;
    const value = `${target?.value ?? e?.nativeEvent?.text ?? ''}`;

    setInternal(value);

    onChange?.({ target, value, focus, blur, clear, isFocused, nativeEvent }, value);
  };

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <BoxFactory map={map} component={Label} className={clsx(classes)} htmlFor={id}>
      <GroupFactory
        {...rest}
        map={map}
        variant="outline"
        focused={focused}
        style={[
          rest.disabled && {
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.background.disabled,
          },

          web && { cursor: 'text' },

          style,
        ]}
        renderChildren={(style) => (
          <BoxFactory
            // Custom
            map={map}
            ref={inputRef}
            component={Input}
            // Html
            id={id}
            className={clsx(classes)}
            autoFocus={autoFocus}
            disabled={rest.disabled}
            name={name}
            placeholder={placeholder}
            value={internal}
            // Bindings
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // Styles
            style={[
              {
                backgroundColor: 'transparent',
                borderWidth: 0,
                color: theme.colors.text.primary,
                fontSize: get('fontSize', style),
                margin: 0,
                padding: 0,
                height: get('fontSize', style) * 1.25,
                width: '100%',
              },

              web && {
                backgroundImage: 'none',
                boxShadow: 'none',
                cursor: 'inherit',
                fontFamily: 'inherit',
                lineHeight: theme.typography.lineHeight,
                outline: '0 !important',
              },
            ]}
            // Specific
            platform={{
              web: {
                readOnly,
                type: pick(secure ? 'secure' : type, 'text', {
                  text: 'text',
                  number: 'number',
                  email: 'email',
                  secure: 'password',
                  phone: 'tel',
                  url: 'url',
                }),
              },
              native: {
                editable: !readOnly,
                keyboardAppearance: theme.mode,
                placeholderTextColor: theme.hex2rgba(theme.colors.text.primary, 0.4),
                secureTextEntry: Boolean(secure),
                selectionColor: theme.colors.primary.main,
                underlineColorAndroid: 'transparent',
                keyboardType: pick(type, 'text', {
                  text: 'default',
                  number: 'number-pad',
                  email: 'email-address',
                  phone: 'phone-pad',
                  url: 'url',
                }),
              },
            }}
          />
        )}
      />
    </BoxFactory>
  );
}

export default React.forwardRef(InputFactory);
