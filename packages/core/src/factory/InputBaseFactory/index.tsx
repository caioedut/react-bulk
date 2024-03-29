import React, { forwardRef, useCallback, useRef, useState } from 'react';

import reference from '../../element/reference';
import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import get from '../../props/get';
import getSize from '../../props/getSize';
import { customStyleProps } from '../../styles/constants';
import { InputBaseProps, RequiredSome } from '../../types';
import global from '../../utils/global';
import pick from '../../utils/pick';
import string from '../../utils/string';
import BoxFactory from '../BoxFactory';
import LabelFactory from '../LabelFactory';
import TextFactory from '../TextFactory';

const InputBaseFactory = React.memo<InputBaseProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.InputBase;
    const { web, native, Input, TextArea } = global.mapping;

    // Extends from default props
    let {
      autoCapitalize,
      autoCorrect,
      caretHidden,
      color,
      colorful,
      disabled,
      endAddon,
      error,
      hidden,
      hint,
      id,
      label,
      multiline,
      name,
      placeholderColor,
      readOnly,
      returnKeyType,
      rows,
      secure,
      selectionColor,
      selectTextOnFocus,
      size,
      startAddon,
      textColor,
      type,
      // Events
      onFocus,
      onBlur,
      onSubmit,
      onKeyDown,
      // Styles
      variants,
      styleMap,
      contentStyle,
      errorStyle,
      hintStyle,
      inputStyle,
      labelStyle,
      style,
      ...rest
    } = factory2<
      RequiredSome<InputBaseProps, 'autoCapitalize' | 'color' | 'returnKeyType' | 'size' | 'type'>,
      typeof options
    >(props, options);

    id = useHtmlId(id);

    const inputRef = useRef<any>(null);
    const [focused, setFocused] = useState(false);

    size = getSize(size);
    color = theme.color(error ? 'error' : color || 'primary');
    selectionColor = theme.color(selectionColor ?? color);
    autoCapitalize = !autoCapitalize ? 'none' : autoCapitalize;
    placeholderColor = theme.color(
      // @ts-expect-error
      placeholderColor ?? get('color', inputStyle) ?? options.defaultStyles.input?.color ?? 'text.primary',
      0.4,
    );

    const shadowColor = theme.color(color, 0.3);
    const baseSize = theme.rem(size as number);
    const spacing = (baseSize - theme.rem()) / 2;
    const height = multiline ? theme.rem() * (rows ?? 6) + spacing * 2 : baseSize;

    if (web) {
      Object.assign(rest, {
        autoCapitalize,
        autoCorrect: autoCorrect ? 'on' : 'off',
        enterKeyHint: returnKeyType,
        disabled,
        readOnly,
        type:
          pick(secure ? 'password' : type, 'default', {
            default: type,
            password: 'password',
            phone: 'tel',
            hidden: 'text',
          }) || 'text',
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
        secureTextEntry: type === 'password' || secure,
        selectionColor,
        selectTextOnFocus,
        cursorColor: selectionColor,
        underlineColorAndroid: 'transparent',
        keyboardType: pick(type, 'text', {
          text: 'default',
          number: 'number-pad',
          email: 'email-address',
          phone: 'phone-pad',
          url: 'url',
          hidden: 'default',
        }),
      });
    }

    // @ts-expect-error
    style = [extract(customStyleProps, rest), style];

    labelStyle = [error && { color: 'error' }, labelStyle];

    hintStyle = [error && { color: 'error' }, hintStyle];

    contentStyle = [
      !disabled && {
        borderColor: !error && !focused && !colorful ? 'gray.light' : color,
      },

      web &&
        focused && {
          boxShadow: `0 0 0 4px ${shadowColor}`,
        },

      contentStyle,
    ];

    inputStyle = [
      {
        height,
        paddingHorizontal: spacing,
      },

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

    const handleFocus = useCallback(
      (event) => {
        setFocused(true);

        if (web) {
          if (selectTextOnFocus) {
            inputRef.current?.select();
          } else {
            const end = string(rest.value).length;
            inputRef.current?.setSelectionRange(end, end);
          }
        }

        onFocus?.(event);
      },
      [onFocus, selectTextOnFocus, rest.value, web],
    );

    const handleBlur = useCallback(
      (event) => {
        setFocused(false);
        onBlur?.(event);
      },
      [onBlur],
    );

    const handleSubmit = useCallback(
      (event) => {
        event?.preventDefault();
        onSubmit?.(event);
      },
      [onSubmit],
    );

    if (typeof onSubmit === 'function') {
      if (web) {
        Object.assign(rest, {
          onKeyDown: (e) => (e.key === 'Enter' || e.keyCode === 13 ? handleSubmit(e) : onKeyDown?.(e)),
        });
      }

      if (native) {
        Object.assign(rest, {
          onSubmitEditing: handleSubmit,
        });
      }
    }

    return (
      <BoxFactory
        data-rbk-input={name}
        hidden={hidden || type === 'hidden'}
        style={style}
        stylist={stylist}
        styleMap={{ root: [variants.root, styleMap?.root] }}
      >
        {Boolean(label) && (
          <LabelFactory
            numberOfLines={1}
            for={id}
            forRef={inputRef}
            style={labelStyle}
            styleMap={{ root: [variants.label, styleMap?.label] }}
            onPress={native ? inputRef?.current?.focus?.() : undefined}
          >
            {label}
          </LabelFactory>
        )}

        <BoxFactory style={contentStyle} styleMap={{ root: [variants.content, styleMap?.content] }}>
          {native && focused && (
            <BoxFactory
              position="absolute"
              pointerEvents="none"
              border={`4px solid ${shadowColor}`}
              corners={get('corners', options.defaultStyles.content, contentStyle)}
              borderRadius={get('borderRadius', options.defaultStyles.content, contentStyle)}
              style={{ inset: -4 }}
            />
          )}

          <BoxFactory row noWrap alignItems="center" justifyContent="space-between" style={{ marginVertical: -1 }}>
            {Boolean(startAddon) && (
              <BoxFactory style={{ marginLeft: spacing }} onPress={() => inputRef?.current?.focus?.()}>
                {startAddon}
              </BoxFactory>
            )}

            <BoxFactory
              ref={reference(ref, inputRef)}
              component={multiline ? TextArea : Input}
              {...rest}
              noRootStyles
              id={id}
              name={name}
              style={inputStyle}
              styleMap={{ root: [variants.input, styleMap?.input] }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {Boolean(endAddon) && (
              <BoxFactory style={{ marginRight: spacing }} onPress={() => inputRef?.current?.focus?.()}>
                {endAddon}
              </BoxFactory>
            )}
          </BoxFactory>
        </BoxFactory>

        {Boolean(hint) && (
          <TextFactory variant="caption" style={hintStyle} styleMap={{ root: [variants.hint, styleMap?.hint] }}>
            {hint}
          </TextFactory>
        )}

        {Boolean(error) && typeof error === 'string' && (
          <TextFactory variant="caption" style={errorStyle} styleMap={{ root: [variants.error, styleMap?.error] }}>
            {error}
          </TextFactory>
        )}
      </BoxFactory>
    );
  }),
);

InputBaseFactory.displayName = 'InputBaseFactory';

export default InputBaseFactory;
