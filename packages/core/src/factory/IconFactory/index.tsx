import React from 'react';

import { BoxFactory, FactoryProps, IconProps, clsx, useTheme } from '@react-bulk/core';

function IconFactory({ name, color, size, className, style, map, ...rest }: FactoryProps & IconProps, ref: any) {
  const theme = useTheme();
  const { web, Icons } = map;
  const classes: any[] = ['rbk-icon', className];

  const iconName = `${name || ''}`
    .split(/_|-|\s/g)
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join('');

  const Component = Icons[iconName] ?? Icons.Question;

  color = theme.color(color ?? 'primary');
  size = size ?? theme.rem(1.25);

  style = [
    web && {
      verticalAlign: 'text-bottom',
    },

    style,
  ];

  return (
    <BoxFactory ref={ref} map={map} component={Component} color={color} size={size} {...rest} className={clsx(classes)} style={style} />
  );
}

export default React.forwardRef(IconFactory);
