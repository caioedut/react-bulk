import React from 'react';

import { crypt, useTheme, uuid } from '@react-bulk/core';

import Platform from '../../Platform';
import get from '../../props/get';
import { ButtonProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';
import LoadingFactory from '../LoadingFactory';
import TextFactory from '../TextFactory';

function ButtonFactory(
  {
    id,
    variant,
    size,
    color,
    block,
    loading,
    disabled,
    startIcon,
    endIcon,
    className,
    style,
    labelStyle,
    children,
    map,
    ...rest
  }: ButtonProps | any,
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

  style = [
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

  labelStyle = [
    {
      color: get('color', style),
      fontSize: get('fontSize', style),
    },

    labelStyle,
  ];

  if (typeof children === 'string') {
    children = (
      <TextFactory map={map} style={[...labelStyle, loading && { opacity: 0 }]}>
        {children}
      </TextFactory>
    );
  }

  return (
    <BoxFactory
      map={map}
      ref={ref}
      component={Button}
      id={id}
      disabled={disabled}
      {...rest}
      style={style}
      className={clsx('rbk-button', className)}
    >
      {Boolean(startIcon) && (
        <BoxFactory map={map} mr={1}>
          {typeof startIcon === 'string' ? <IconFactory name={startIcon} /> : startIcon}
        </BoxFactory>
      )}

      {children}

      {Boolean(endIcon) && (
        <BoxFactory map={map} ml={1}>
          {typeof endIcon === 'string' ? <IconFactory name={endIcon} /> : endIcon}
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
            bg: theme.colors.background.secondary,
            borderRadius: get('borderRadius', style),
          }}
        >
          <LoadingFactory map={map} />
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(ButtonFactory);
