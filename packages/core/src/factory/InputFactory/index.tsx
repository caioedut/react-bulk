import React from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import get from '../../props/get';
import remove from '../../props/remove';
import { spacings } from '../../styles/jss';
import { InputProps } from '../../types';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

function InputFactory({ label, error, size, color, disabled, style, inputStyle, labelStyle, map, ...rest }: InputProps | any, ref: any) {
  const theme = useTheme();

  const { web, native } = Platform;
  const { Input, Label, ios } = map;

  color = color ?? theme.colors.primary.main;

  style = [
    ...spacings
      .filter((attr) => attr in rest)
      .map((attr) => {
        const val = rest[attr];
        delete rest[attr];
        return { [attr]: val };
      }),
    style,
  ];

  inputStyle = [
    {
      fontSize: theme.rem(1),
      lineHeight: 1.25,

      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color,
      borderRadius: theme.shape.borderRadius,

      margin: 0,
      padding: theme.rem(0.5),
      width: '100%',
    },

    size === 'small' && {
      fontSize: theme.rem(0.875),
      padding: theme.rem(0.5, theme.rem(0.875)),
    },

    size === 'large' && {
      fontSize: theme.rem(1.25),
      padding: theme.rem(0.5, theme.rem(1.25)),
    },

    disabled && {
      backgroundColor: theme.colors.background.secondary,
      borderColor: theme.colors.background.disabled,
      opacity: 0.75,
    },

    web && disabled && { cursor: 'not-allowed' },

    web && {
      fontFamily: 'inherit',
      transition: 'box-shadow 0.2s ease',

      '&:focus': {
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
      },
    },

    inputStyle,
  ];

  labelStyle = [{ mb: 1 }, labelStyle];

  if (native) {
    // Calculate full height (for iOS)
    const pt = get('paddingTop', inputStyle) ?? get('paddingVertical', inputStyle) ?? get('padding', inputStyle) ?? 0;
    const pb = get('paddingBottom', inputStyle) ?? get('paddingVertical', inputStyle) ?? get('padding', inputStyle) ?? 0;
    const bt = get('borderTopWidth', inputStyle) ?? get('borderWidth', inputStyle) ?? 0;
    const bb = get('borderBottomWidth', inputStyle) ?? get('borderWidth', inputStyle) ?? 0;
    const fs = get('fontSize', inputStyle);
    const lh = get('lineHeight', inputStyle);

    inputStyle.push({
      height: get('height', inputStyle) ?? pt + pb + bt + bb + fs * lh,
    });

    if (ios) {
      remove('lineHeight', inputStyle);
    }
  }

  return (
    <BoxFactory map={map} style={style}>
      {Boolean(label) && (
        <TextFactory map={map} component={Label} numberOfLines={1} style={labelStyle}>
          {label}
        </TextFactory>
      )}
      <BoxFactory map={map} ref={ref} component={Input} disabled={disabled} {...rest} style={inputStyle} />
      {Boolean(error) && (
        <TextFactory map={map} mt={1} ml={1} numberOfLines={1} size={0.8} color="error">
          {error}
        </TextFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(InputFactory);
