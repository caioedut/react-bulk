import React from 'react';

import { BadgeProps, FactoryProps, TextFactory, clsx, useTheme } from '@react-bulk/core';

function BadgeFactory({ className, children, map, ...props }: FactoryProps & BadgeProps, ref: any) {
  const theme = useTheme();
  const { web, native, Text } = map;
  const classes: any[] = ['rbk-badge', className];

  // Extends from default props
  props = { ...theme.components.Badge.defaultProps, ...props };

  let { bottom, color, dot, left, right, size, top, value, style, ...rest } = props;

  const absolute = top || bottom || left || right;
  const baseSize = size === 'small' ? theme.rem(1) : size === 'large' ? theme.rem(1.5) : theme.rem(1.25);
  const halfBaseSize = baseSize / 2;

  style = [
    {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',

      backgroundColor: color,
      borderRadius: halfBaseSize,
      color: theme.colors.common.white,
      fontSize: theme.rem(0.625),
    },

    absolute && {
      position: 'absolute',
      border: `1px solid ${theme.colors.background.primary}`,
    },

    top && { top: -halfBaseSize },
    bottom && { bottom: -halfBaseSize },
    left && { left: -halfBaseSize },
    right && { right: -halfBaseSize },

    dot && {
      borderRadius: halfBaseSize / 2,
      height: halfBaseSize,
      width: halfBaseSize,
    },

    !dot && {
      px: halfBaseSize * 0.15,
      height: baseSize,
      minWidth: baseSize,
    },

    web && {
      display: 'inline-flex',
      lineHeight: 1,
    },

    native && {
      alignSelf: 'flex-start',
      py: halfBaseSize * 0.05,
    },

    style,
  ];

  return (
    <TextFactory map={map} ref={ref} {...rest} bold className={clsx(classes)} style={style}>
      {!dot && <Text>{value ?? children ?? '&nbsp;'}</Text>}
    </TextFactory>
  );
}

export default React.forwardRef(BadgeFactory);
