import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory from '../../props/factory';
import { spacings } from '../../styles/jss';
import { FactoryProps, InputProps } from '../../types';
import useHtmlId from '../../useHtmlId';
import useStylist from '../../useStylist';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import { useForm } from '../FormFactory';
import IconFactory from '../IconFactory';
import LabelFactory from '../LabelFactory';

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
    id,
    label,
    multiline,
    name,
    readOnly,
    returnKeyType,
    secure,
    selectionColor,
    size,
    startIcon,
    type,
    value,
    onChange,
    onFocus,
    onBlur,
    containerStyle,
    defaultStyle,
    inputStyle,
    labelStyle,
    style,
    ...rest
  } = factory(props, options.defaultProps);

  id = useHtmlId(id);

  const form = useForm();
  const defaultRef: any = useRef(null);
  const inputRef = ref || defaultRef;

  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState(`${defaultValue ?? ''}`);

  selectionColor = theme.color(selectionColor ?? color);

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
      placeholderTextColor: theme.hex2rgba('text.primary', 0.4),
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
      get: () => internal,
    });

    return () => form.unsetField(name);
  }, [name, form, internal]);

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

  const multiplier = pick(size, 'medium', {
    xsmall: 0.625,
    small: 0.75,
    medium: 1,
    large: 1.25,
    xlarge: 1.625,
  });

  const fontSize = theme.rem(multiplier);
  const lineSize = theme.rem(theme.typography.lineHeight, fontSize);
  const spacing = theme.rem(0.5, fontSize);
  const height = lineSize * (multiline ? 3 : 1) + spacing * 2;

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleFocus = useStylist({
    avoid: !focused,
    name: options.name + '-focus',
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

  const styleDisabled = useStylist({
    avoid: !disabled,
    name: options.name + '-disabled',
    style: {
      backgroundColor: theme.hex2rgba('background.disabled', 0.125),
      borderColor: theme.hex2rgba('background.disabled', 0.25),
      web: {
        cursor: 'not-allowed',
        '& *': { cursor: 'not-allowed' },
      },
    },
  });

  const styleState = useStylist({
    style: { borderColor: color },
  });

  const inputStyleRoot = useStylist({
    name: options.name + '-input',
    style: inputStyle,
  });

  const inputStyleState = useStylist({
    style: [
      {
        fontSize,
        height,
        padding: spacing,
      },

      web && {
        caretColor: caretHidden ? theme.colors.common.trans : selectionColor,
      },

      web &&
        selectionColor && {
          '&::-moz-selection': { backgroundColor: selectionColor, color: theme.contrast(selectionColor) },
          '&::selection': { backgroundColor: selectionColor, color: theme.contrast(selectionColor) },
        },
    ],
  });

  containerStyle = [extract(spacings, rest, style), containerStyle];

  return (
    <BoxFactory map={map} style={containerStyle}>
      {Boolean(label) && (
        <LabelFactory map={map} numberOfLines={1} for={inputRef} style={[{ mx: 1, mb: 1 }, labelStyle]}>
          {label}
        </LabelFactory>
      )}

      <BoxFactory map={map} stylist={[styleRoot, styleFocus, styleDisabled, styleState, stylist]} style={style}>
        <BoxFactory
          map={map}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {Boolean(startIcon) && (
            <BoxFactory map={map} style={{ marginLeft: spacing }}>
              {typeof startIcon === 'string' ? <IconFactory map={map} name={startIcon} color={color} size={lineSize} /> : startIcon}
            </BoxFactory>
          )}

          <BoxFactory
            map={map}
            ref={inputRef}
            component={multiline ? TextArea : Input}
            stylist={[inputStyleRoot, inputStyleState]}
            {...rest}
            id={id}
            disabled={disabled}
            name={name}
            value={internal}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {Boolean(endIcon) && (
            <BoxFactory map={map} style={{ marginRight: spacing }}>
              {typeof endIcon === 'string' ? <IconFactory map={map} name={endIcon} color={color} size={lineSize} /> : endIcon}
            </BoxFactory>
          )}
        </BoxFactory>
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(InputFactory);
