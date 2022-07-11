import React from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import get from '../../props/get';
import { ButtonProps } from '../../types';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

function ButtonFactory({ variant, size, block, loading, style, children, map, ...rest }: ButtonProps | any, ref) {
  const theme = useTheme();

  const { web } = Platform;
  const { Button } = map;

  const { disabled } = rest;

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

      backgroundColor: theme.colors.primary.main,
      color: theme.colors.common.white,
      cursor: 'pointer',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
      borderRadius: theme.shape.borderRadius,

      margin: 0,
      paddingTop: theme.rem(0.5),
      paddingBottom: theme.rem(0.5),
      paddingLeft: theme.rem(1),
      paddingRight: theme.rem(1),

      '&:hover': { backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.9) },
    },

    variant === 'text' && { borderColor: theme.colors.common.trans },

    (variant === 'outline' || variant === 'text') && {
      backgroundColor: theme.colors.common.trans,
      color: theme.colors.primary.main,

      '&:hover': { backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.1) },
    },

    size === 'small' && {
      fontSize: theme.rem(0.875),
      paddingTop: theme.rem(0.5, theme.rem(0.875)),
      paddingBottom: theme.rem(0.5, theme.rem(0.875)),
      paddingLeft: theme.rem(0.75, theme.rem(0.875)),
      paddingRight: theme.rem(0.75, theme.rem(0.875)),
    },

    size === 'large' && {
      fontSize: theme.rem(1.25),
      paddingTop: theme.rem(0.5, theme.rem(1.25)),
      paddingBottom: theme.rem(0.5, theme.rem(1.25)),
      paddingLeft: theme.rem(1, theme.rem(1.25)),
      paddingRight: theme.rem(1, theme.rem(1.25)),
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
    <BoxFactory map={map} ref={ref} component={Button} {...rest} style={styleX}>
      {children}
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
