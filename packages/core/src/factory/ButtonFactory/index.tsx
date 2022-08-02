import React from 'react';

import { crypt, useTheme, uuid } from '@react-bulk/core';

import Platform from '../../Platform';
import get from '../../props/get';
import { ButtonProps } from '../../types';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

function ButtonFactory(
  { id, variant, size, color, block, loading, disabled, startIcon, endIcon, style, children, map, ...rest }: ButtonProps | any,
  ref,
) {
  const theme = useTheme();

  const { web } = Platform;
  const { Button } = map;

  id = id ?? `rbk-${crypt(uuid())}`;
  color = color ?? 'primary';

  if (web && !rest.type) {
    rest.type = 'button';
  }

  const styleX = [
    {
      position: 'relative',

      display: web ? 'inline-flex' : 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',

      fontSize: theme.rem(1),
      lineHeight: 1.25,

      backgroundColor: color,
      color: theme.colors.common.white,
      cursor: 'pointer',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
      borderRadius: theme.shape.borderRadius,

      margin: 0,
      padding: theme.rem(0.5),

      '&:hover': { backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.9) },
    },

    (variant === 'outline' || variant === 'text') && {
      backgroundColor: theme.colors.common.trans,
      borderColor: color,
      color,

      '&:hover': { backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.1) },
    },

    variant === 'text' && {
      borderColor: theme.colors.common.trans,
    },

    size === 'small' && {
      fontSize: theme.rem(0.875),
      padding: theme.rem(0.5, theme.rem(0.875)),
    },

    size === 'large' && {
      fontSize: theme.rem(1.25),
      padding: theme.rem(0.5, theme.rem(1.25)),
    },

    block && { width: '100%' },

    (disabled || loading) && { opacity: 0.75 },

    web && disabled && { cursor: 'not-allowed' },

    web && {
      fontFamily: 'inherit',
      transitionProperty: 'background-color, box-shadow',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease',

      '-webkit-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',

      '&:focus': {
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
      },
    },

    style,
  ];

  const textStyleX = {
    color: get('color', styleX),
    fontSize: get('fontSize', styleX),
  };

  if (typeof children === 'string') {
    children = (
      <TextFactory map={map} style={[textStyleX, loading && { opacity: 0 }]}>
        {children}
      </TextFactory>
    );
  }

  return (
    <BoxFactory map={map} ref={ref} component={Button} id={id} disabled={disabled} {...rest} style={styleX}>
      {Boolean(startIcon) && (
        <BoxFactory map={map} mr={1}>
          {startIcon}
        </BoxFactory>
      )}

      {children}

      {Boolean(endIcon) && (
        <BoxFactory map={map} ml={1}>
          {endIcon}
        </BoxFactory>
      )}

      {loading && (
        <BoxFactory
          map={map}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bg: theme.hex2rgba(theme.colors.background.primary, 0.1),
          }}
        >
          <TextFactory map={map} style={textStyleX}>
            ...
          </TextFactory>
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(ButtonFactory);
