import React, { useCallback, useEffect, useRef, useState } from 'react';

import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import { customStyleProps } from '../../styles/constants';
import { FactoryProps, InputProps } from '../../types';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';
import TextFactory from '../TextFactory';

function InputFactory({ stylist, map, innerRef, ...props }: FactoryProps & InputProps) {
  const theme = useTheme();
  const options = theme.components.Input;
  const { web, native, Input, TextArea } = map;

  // Extends from default props
  let {
    autoCapitalize,
    autoCorrect,
    caretHidden,
    color,
    defaultValue,
    disabled,
    endAddon,
    endIcon,
    error,
    id,
    label,
    mask,
    multiline,
    name,
    placeholderColor,
    readOnly,
    returnKeyType,
    secure,
    selectionColor,
    size,
    startAddon,
    startIcon,
    textColor,
    type,
    unmask,
    value,
    // Events
    onChange,
    onFocus,
    onBlur,
    onFormChange,
    // Styles
    variants,
    contentStyle,
    errorStyle,
    inputStyle,
    labelStyle,
    style,
    ...rest
  } = factory2(props, options);

  id = useHtmlId(id);

  const form = useForm();
  const defaultRef: any = useRef(null);
  const inputRef = innerRef || defaultRef;

  const maskValue = useCallback(
    (value) => {
      value = typeof mask === 'function' ? mask(value) : value;
      return value ?? '';
    },
    [mask],
  );

  const unmaskValue = useCallback(
    (value) => {
      value = typeof unmask === 'function' ? unmask(maskValue(value)) : value;
      return value ?? '';
    },
    [unmask],
  );

  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState(defaultValue);

  selectionColor = theme.color(selectionColor ?? color);
  placeholderColor = theme.hex2rgba(placeholderColor ?? inputStyle?.color ?? options.defaultStyles.input.color ?? 'text.primary', 0.4);
  autoCapitalize = !autoCapitalize ? 'none' : autoCapitalize;

  startAddon = startAddon ?? startIcon;
  endAddon = endAddon ?? endIcon;

  if (web) {
    Object.assign(rest, {
      autoCapitalize,
      autoCorrect: autoCorrect ? 'on' : 'off',
      enterKeyHint: returnKeyType,
      disabled,
      readOnly,
      type: pick(secure ? 'secure' : type, 'text', {
        text: 'text',
        number: 'number',
        email: 'email',
        secure: 'password',
        phone: 'tel',
        url: 'url',
      }),
    });
  }

  if (native) {
    Object.assign(rest, {
      autoCapitalize,
      autoCorrect,
      caretHidden,
      multiline,
      editable: disabled ? false : !readOnly,
      keyboardAppearance: theme.mode,
      placeholderTextColor: placeholderColor,
      returnKeyType: returnKeyType === 'default' ? 'done' : returnKeyType,
      secureTextEntry: secure,
      selectionColor,
      underlineColorAndroid: 'transparent',
      keyboardType: pick(type, 'text', {
        text: 'default',
        number: 'number-pad',
        email: 'email-address',
        phone: 'phone-pad',
        url: 'url',
      }),
    });
  }

  if (typeof size === 'string') {
    size = pick(size, 'medium', {
      xsmall: 0.625,
      small: 0.75,
      medium: 1,
      large: 1.25,
      xlarge: 1.625,
    });
  }

  const fontSize = theme.rem(size);
  const spacing = fontSize / 2;
  const height = fontSize * (multiline ? 4 : 2);

  useEffect(() => {
    if (typeof value === 'undefined') return;
    setInternal(value);
  }, [value]);

  useEffect(() => {
    if (!name || !form) return;

    form.setField({
      name,
      set: (value) => setInternal(unmaskValue(value)),
      get: () => internal,
      onFormChange,
    });

    return () => {
      form.unsetField(name);
    };
  }, [name, form, onFormChange, internal]);

  const focus = useCallback(() => inputRef?.current?.focus?.(), [inputRef]);
  const blur = useCallback(() => inputRef?.current?.blur?.(), [inputRef]);
  const clear = useCallback(() => setInternal(defaultValue), []);
  const isFocused = useCallback(() => inputRef?.current?.isFocused?.() || inputRef?.current === document?.activeElement, [inputRef]);

  function dispatchEvent(type: string, value: number, nativeEvent?: any) {
    const callback = {
      change: onChange,
      focus: onFocus,
      blur: onBlur,
    }[type];

    if (typeof callback === 'function') {
      const target = inputRef.current;
      callback({ type, value, name, target, focus, blur, clear, isFocused, nativeEvent }, value);
    }
  }

  const handleChange = (e) => {
    const target = inputRef?.current;
    const nativeEvent = e?.nativeEvent ?? e;
    const value = unmaskValue(target?.value ?? e?.nativeEvent?.text);

    setInternal(value);
    dispatchEvent('change', value, nativeEvent);
  };

  const handleFocus = (e) => {
    const nativeEvent = e?.nativeEvent ?? e;
    setFocused(true);
    dispatchEvent('focus', internal, nativeEvent);
  };

  const handleBlur = (e) => {
    const nativeEvent = e?.nativeEvent ?? e;
    setFocused(false);
    dispatchEvent('blur', internal, nativeEvent);
  };

  style = [extract(customStyleProps, rest), style];

  contentStyle = [
    color &&
      !disabled && {
        borderColor: color,
      },

    web &&
      focused && {
        boxShadow: `0 0 0 4px ${theme.hex2rgba(color, 0.3)}`,
      },

    contentStyle,
  ];

  inputStyle = [
    {
      fontSize,
      height,
      paddingHorizontal: spacing,
    },

    multiline && { height },

    textColor && { color: textColor },

    web && { paddingVertical: spacing },

    web && { caretColor: caretHidden ? theme.colors.common.trans : selectionColor },

    web &&
      placeholderColor && {
        '&::-webkit-input-placeholder': { color: placeholderColor },
        '&::-ms-input-placeholder': { color: placeholderColor },
        '&::placeholder': { color: placeholderColor },
      },

    web &&
      selectionColor && {
        '&::selection': { backgroundColor: selectionColor, color: theme.contrast(selectionColor) },
      },

    inputStyle,
  ];

  return (
    <BoxFactory map={map} style={style} stylist={[variants.root, stylist]}>
      {Boolean(label) && (
        <LabelFactory map={map} numberOfLines={1} for={inputRef} style={labelStyle} stylist={[variants.label]}>
          {label}
        </LabelFactory>
      )}

      <BoxFactory map={map} style={contentStyle} stylist={[variants.content]}>
        <BoxFactory map={map} row noWrap alignItems="center" justifyContent="space-between" style={{ marginVertical: -1 }}>
          {Boolean(startAddon) && (
            <BoxFactory map={map} style={{ marginLeft: spacing }} onPress={focus}>
              {startAddon}
            </BoxFactory>
          )}

          <BoxFactory
            map={map}
            innerRef={inputRef}
            component={multiline ? TextArea : Input}
            style={inputStyle}
            stylist={[variants.input]}
            {...rest}
            id={id}
            disabled={disabled}
            name={name}
            value={maskValue(internal)}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {Boolean(endAddon) && (
            <BoxFactory map={map} style={{ marginRight: spacing }} onPress={focus}>
              {endAddon}
            </BoxFactory>
          )}
        </BoxFactory>
      </BoxFactory>

      {Boolean(error) && typeof error === 'string' && (
        <TextFactory map={map} variant="caption" style={errorStyle} stylist={[variants.error]}>
          {error}
        </TextFactory>
      )}
    </BoxFactory>
  );
}

export default React.memo(InputFactory);
