import React from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import { IconProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function IconFactory({ name, color, size, className, style, map, ...rest }: IconProps | any, ref: any) {
  const theme = useTheme();
  const { web } = Platform;
  const { Icons } = map;

  const iconName = `${name || ''}`
    .split(/_|-|\s/g)
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join('');

  const Component = Icons[iconName] ?? Icons.Question;

  color = theme.color(color ?? 'primary');
  size = size ?? theme.typography.iconSize;

  style = [
    web && {
      verticalAlign: 'text-bottom',
    },

    style,
  ];

  return (
    <BoxFactory
      ref={ref}
      map={map}
      component={Component}
      color={color}
      size={size}
      {...rest}
      className={clsx('rbk-icon', className)}
      style={style}
    />
  );
}

export default React.forwardRef(IconFactory);
