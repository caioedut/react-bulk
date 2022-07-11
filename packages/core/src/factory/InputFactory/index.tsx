import React from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import get from '../../props/get';
import remove from '../../props/remove';
import { spacings } from '../../styles/jss';
import { InputProps } from '../../types';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

function InputFactory({ label, size, style, containerStyle, map, ...rest }: InputProps | any, ref: any) {
  const theme = useTheme();

  const { web, native } = Platform;
  const { Input, ios } = map;
  const { disabled } = rest;

  containerStyle = [
    ...spacings
      .filter((attr) => attr in rest)
      .map((attr) => {
        const val = rest[attr];
        delete rest[attr];
        return { [attr]: val };
      }),
    containerStyle,
  ];

  style = [
    {
      fontSize: theme.rem(1),
      lineHeight: 1.25,

      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
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

    style,
  ];

  if (native) {
    // Calculate full height (for iOS)
    const pt = get('paddingTop', style) ?? get('paddingVertical', style) ?? get('padding', style) ?? 0;
    const pb = get('paddingBottom', style) ?? get('paddingVertical', style) ?? get('padding', style) ?? 0;
    const bt = get('borderTopWidth', style) ?? get('borderWidth', style) ?? 0;
    const bb = get('borderBottomWidth', style) ?? get('borderWidth', style) ?? 0;
    const fs = get('fontSize', style);
    const lh = get('lineHeight', style);

    style.height = get('height', style) ?? pt + pb + bt + bb + fs * lh;

    if (ios) {
      remove('lineHeight', style);
    }
  }

  return (
    <BoxFactory map={map} style={containerStyle}>
      {Boolean(label) && (
        <TextFactory map={map} mb={1} numberOfLines={1}>
          {label}
        </TextFactory>
      )}
      <BoxFactory map={map} ref={ref} component={Input} {...rest} style={style} />
    </BoxFactory>
  );
}

export default React.forwardRef(InputFactory);
