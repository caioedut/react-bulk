import React from 'react';

import { crypt, useTheme, uuid } from '@react-bulk/core';

import get from '../../props/get';
import remove from '../../props/remove';
import { spacings } from '../../styles/jss';
import { InputProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';
import LabelFactory from '../LabelFactory';
import TextFactory from '../TextFactory';

function InputFactory(
  { id, label, error, size, color, disabled, startIcon, endIcon, className, style, inputStyle, labelStyle, map, ...rest }: InputProps | any,
  ref: any,
) {
  const theme = useTheme();
  const { Input, web, native, ios } = map;

  id = id ?? `rbk-${crypt(uuid())}`;
  color = color ?? theme.colors.primary.main;

  const fontSize = size === 'small' ? theme.rem(0.75) : size === 'large' ? theme.rem(1.25) : theme.rem();
  const iconSize = fontSize * 1.25;

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
      fontSize,
      lineHeight: 1.25,

      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color,
      borderRadius: theme.shape.borderRadius,

      flex: 1,
      margin: 0,
      padding: theme.rem(0.5, fontSize),
      width: '100%',
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

  const borderRadius = get('borderRadius', inputStyle);

  const iconStyle = {
    backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.1),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color,
    borderRadius: borderRadius,
    padding: theme.rem(fontSize, 0.25),
  };

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
    <BoxFactory map={map} className={clsx('rbk-input', className)} style={style}>
      {Boolean(label) && (
        <LabelFactory map={map} for={id} numberOfLines={1} style={labelStyle}>
          {label}
        </LabelFactory>
      )}

      <BoxFactory map={map} flexbox wrap="nowrap" alignItems="center">
        {Boolean(startIcon) && (
          <BoxFactory map={map} style={[iconStyle, { borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}>
            {typeof startIcon === 'string' ? <IconFactory map={map} name={startIcon} color={color} size={iconSize} /> : startIcon}
          </BoxFactory>
        )}

        <BoxFactory map={map} ref={ref} component={Input} id={id} disabled={disabled} {...rest} style={inputStyle} />

        {Boolean(endIcon) && (
          <BoxFactory map={map} style={[iconStyle, { borderLeftWidth: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
            {typeof endIcon === 'string' ? <IconFactory map={map} name={endIcon} color={color} size={iconSize} /> : endIcon}
          </BoxFactory>
        )}
      </BoxFactory>

      {Boolean(error) && (
        <TextFactory map={map} mt={1} ml={1} numberOfLines={1} size={0.8} color="error">
          {error}
        </TextFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(InputFactory);
