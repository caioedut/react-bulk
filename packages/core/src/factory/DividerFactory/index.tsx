import React from 'react';

import { BoxFactory, DividerProps, FactoryProps, clsx, useTheme } from '@react-bulk/core';

function DividerFactory({ color, size, opacity, vertical, className, style, map, ...rest }: FactoryProps & DividerProps, ref: any) {
  const theme = useTheme();
  const classes: any[] = ['rbk-divider', className];

  style = [
    {
      backgroundColor: color ?? theme.colors.text.secondary,
      opacity: opacity ?? 0.25,
    },

    vertical && { width: size ?? 1, height: '100%' },

    !vertical && { height: size ?? 1 },

    style,
  ];

  return <BoxFactory map={map} ref={ref} {...rest} className={clsx(classes)} style={style} />;
}

export default React.forwardRef(DividerFactory);
