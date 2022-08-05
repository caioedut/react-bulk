import React from 'react';

import { crypt, useTheme, uuid } from '@react-bulk/core';

import get from '../../props/get';
import { ButtonProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';
import LabelFactory from '../LabelFactory';
import LoadingFactory from '../LoadingFactory';

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
  const { web, Button, Text } = map;

  id = id ?? `rbk-${crypt(uuid())}`;
  color = color ?? 'primary';

  const fontSize = size === 'small' ? theme.rem(0.75) : size === 'large' ? theme.rem(1.25) : theme.rem();
  const iconSize = fontSize * 1.25;

  style = [
    {
      position: 'relative',

      display: web ? 'inline-flex' : 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',

      fontSize,
      lineHeight: 1.25,

      backgroundColor: color,
      color: theme.colors.common.white,
      cursor: 'pointer',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
      borderRadius: theme.shape.borderRadius,

      margin: 0,
      padding: theme.rem(0.5, fontSize),

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
      fontSize,
    },

    labelStyle,
  ];

  const iconColor = get('color', labelStyle);

  if (web && !rest.type) {
    rest.type = 'button';
  }

  if (typeof children === 'string') {
    children = (
      <LabelFactory map={map} component={Text} style={[...labelStyle, loading && { opacity: 0 }]}>
        {children}
      </LabelFactory>
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
        <BoxFactory map={map} mr={children || endIcon ? 1 : 0}>
          {typeof startIcon === 'string' ? <IconFactory map={map} name={startIcon} color={iconColor} size={iconSize} /> : startIcon}
        </BoxFactory>
      )}

      {children}

      {Boolean(endIcon) && (
        <BoxFactory map={map} ml={children || startIcon ? 1 : 0}>
          {typeof endIcon === 'string' ? <IconFactory map={map} name={endIcon} color={iconColor} size={iconSize} /> : endIcon}
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
            bg: theme.hex2rgba(theme.colors.background.secondary, 0.1),
            borderRadius: get('borderRadius', style),
          }}
        >
          <LoadingFactory map={map} color={iconColor} size={iconSize} />
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(ButtonFactory);
