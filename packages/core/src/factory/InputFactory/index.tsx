import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BoxFactory, FactoryProps, GroupFactory, InputProps, clsx, get, pick, useTheme } from '@react-bulk/core';

function InputFactory({ className, map, ...props }: FactoryProps & InputProps, ref: any) {
  const theme = useTheme();
  const { web, native, Input, Label, TextArea, View } = map;
  const classes: any[] = ['rbk-input', className];

  // Extends from default props
  props = { ...theme.components.Input.defaultProps, ...props };

  let {
    autoCapitalize,
    autoCorrect,
    autoFocus,
    caretHidden,
    defaultValue,
    maxLength,
    multiline,
    name,
    placeholder,
    readOnly,
    returnKeyType,
    secure,
    selectionColor,
    type,
    value,
    // Bindings
    onChange,
    onFocus,
    onBlur,
    // Styles
    style,
    ...rest
  } = props;

  const defaultRef: any = useRef(null);
  const inputRef = ref || defaultRef;

  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState(`${defaultValue ?? ''}`);

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
    <BoxFactory map={map} component={native ? View : Label} className={clsx(classes)}>
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
            component={multiline ? TextArea : Input}
            // Component
            className={clsx(classes)}
            autoCapitalize={autoCapitalize}
            autoFocus={autoFocus}
            maxLength={maxLength}
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
                flex: 1,
                fontSize: get('fontSize', style),
                margin: 0,
                padding: 0,
                height: get('fontSize', style) * 1.25,
                width: '100%',

                web: [
                  {
                    backgroundImage: 'none',
                    boxShadow: 'none',
                    caretColor: caretHidden ? theme.colors.common.trans : selectionColor,
                    cursor: 'inherit',
                    fontFamily: 'inherit',
                    outline: '0 !important',
                  },

                  caretHidden && { caretColor: 'transparent' },

                  selectionColor && {
                    '&::-moz-selection': { backgroundColor: selectionColor },
                    '&::selection': { backgroundColor: selectionColor },
                  },
                ],
              },
            ]}
            // Specific
            platform={{
              web: {
                autoCorrect: autoCorrect ? 'on' : 'off',
                enterKeyHint: returnKeyType,
                disabled: rest.disabled,
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
                autoCorrect,
                caretHidden,
                multiline,
                editable: rest.disabled ? false : !readOnly,
                keyboardAppearance: theme.mode,
                placeholderTextColor: theme.hex2rgba(theme.colors.text.primary, 0.4),
                returnKeyType: returnKeyType === 'default' ? 'done' : returnKeyType,
                secureTextEntry: Boolean(secure),
                selectionColor,
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
