import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import { spacings } from '../../styles/jss';
import { FactoryProps, InputProps } from '../../types';
import useHtmlId from '../../useHtmlId';
import useStylist from '../../useStylist';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';
import TextFactory from '../TextFactory';

function InputFactory({ stylist, map, ...props }: FactoryProps & InputProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Input;
  const { web, native, Input, TextArea } = map;

  // Extends from default props
  let {
    autoCorrect,
    caretHidden,
    color,
    defaultValue,
    disabled,
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
    startIcon,
    type,
    unmask,
    value,
    // Events
    onChange,
    onFocus,
    onBlur,
    // Styles
    variants,
    containerStyle,
    errorStyle,
    inputStyle,
    labelStyle,
    style,
    ...rest
  } = factory2(props, options, theme);

  id = useHtmlId(id);

  const form = useForm();
  const defaultRef: any = useRef(null);
  const inputRef = ref || defaultRef;

  const maskValue = useCallback(
    (value) => {
      value = typeof mask === 'function' ? mask(value) : value;
      return value ?? '';
    },
    [mask],
  );

  const unmaskValue = useCallback(
    (value) => {
      value = typeof unmask === 'function' ? unmask(value) : value;
      return value ?? '';
    },
    [unmask],
  );

  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState(defaultValue);

  selectionColor = theme.color(selectionColor ?? color);
  placeholderColor = theme.hex2rgba(placeholderColor ?? inputStyle?.color ?? options.defaultStyles.input.color ?? 'text.primary', 0.4);

  if (web) {
    Object.assign(rest, {
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
  const spacing = theme.rem(0.5, fontSize);
  const height = (multiline ? 3 : 1) * fontSize * +options.defaultStyles.input.height.replace(/[^.\d]/g, '');

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setInternal(value);
    }
  }, [value]);

  useEffect(() => {
    if (!name || !form) return;

    form.setField({
      name,
      set: setInternal,
      get: () => unmaskValue(maskValue(internal)),
    });

    return () => {
      form.unsetField(name);
    };
  }, [name, form, internal]);

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
    const value = maskValue(target?.value ?? e?.nativeEvent?.text);

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

  const styleFocus = useStylist({
    avoid: !focused,
    style: {
      web: {
        boxShadow: `0 0 0 4px ${theme.hex2rgba(color, 0.3)}`,
      },
      native: {
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    },
  });

  const styleColor = useStylist({
    avoid: disabled,
    style: color && { borderColor: color },
  });

  const styleInputState = useStylist({
    style: [
      {
        fontSize,
        height,
        paddingVertical: 0,
        paddingHorizontal: spacing,
      },

      web && { paddingVertical: spacing * 2 },

      multiline && { height },

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
    ],
  });

  containerStyle = [extract(spacings, rest, style), containerStyle];

  return (
    <BoxFactory map={map} style={containerStyle}>
      {Boolean(label) && (
        <LabelFactory map={map} numberOfLines={1} for={inputRef} style={labelStyle} stylist={[variants.label]}>
          {label}
        </LabelFactory>
      )}

      <BoxFactory map={map} stylist={[variants.root, styleFocus, styleColor, stylist]} style={style}>
        <BoxFactory map={map} row noWrap alignItems="center" justifyContent="space-between" style={{ marginVertical: -1 }}>
          {Boolean(startIcon) && (
            <BoxFactory map={map} style={{ marginLeft: spacing }}>
              {startIcon}
            </BoxFactory>
          )}

          <BoxFactory
            map={map}
            ref={inputRef}
            component={multiline ? TextArea : Input}
            style={inputStyle}
            stylist={[variants.input, styleInputState]}
            {...rest}
            id={id}
            disabled={disabled}
            name={name}
            value={maskValue(internal)}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {Boolean(endIcon) && (
            <BoxFactory map={map} style={{ marginRight: spacing }}>
              {endIcon}
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

export default React.forwardRef(InputFactory);
