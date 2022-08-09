import React from 'react';

import { BadgeProps, useTheme } from '@react-bulk/core';

import clsx from '../../utils/clsx';
import TextFactory from '../TextFactory';

function BadgeFactory(
  { dot, color, size, top, bottom, left, right, className, style, children, map, ...rest }: BadgeProps | any,
  ref: any,
) {
  const theme = useTheme();
  const { web, Text } = map;
  const classes: any[] = ['rbk-badge', className];

  color = color ?? theme.colors.error.dark;

  const absolute = top || bottom || left || right;
  const width = size === 'small' ? theme.rem(1) : size === 'large' ? theme.rem(1.5) : theme.rem(1.25);
  const halfWidth = width / 2;

  style = [
    {
      backgroundColor: color,
      borderRadius: halfWidth,
      color: theme.colors.common.white,
      fontSize: theme.rem(0.625),
      lineHeight: 1,
    },

    absolute && {
      position: 'absolute',
      border: `1px solid ${theme.colors.background.primary}`,
    },

    top && { top: -halfWidth },
    bottom && { bottom: -halfWidth },
    left && { left: -halfWidth },
    right && { right: -halfWidth },

    dot && {
      borderRadius: halfWidth / 2,
      height: halfWidth,
      width: halfWidth,
    },

    !dot && {
      py: 1,
      px: 1.5,
      minHeight: width,
      minWidth: width,
    },

    web && { display: 'inline-block' },

    style,
  ];

  return (
    <TextFactory map={map} ref={ref} {...rest} flexbox center noWrap bold className={clsx(classes)} style={style}>
      {!dot && <Text>{children ?? '&nbsp;'}</Text>}
    </TextFactory>
  );
}

export default React.forwardRef(BadgeFactory);
