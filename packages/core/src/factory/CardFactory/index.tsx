import React from 'react';

import { BoxFactory, CardProps, FactoryProps, clsx, useTheme } from '@react-bulk/core';

function CardFactory({ className, style, map, ...rest }: FactoryProps & CardProps, ref: any) {
  const theme = useTheme();
  const classes: any[] = ['rbk-card', className];

  style = [
    {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.shape.borderRadius,
      p: 3,
    },

    style,
  ];

  return <BoxFactory map={map} ref={ref} {...rest} className={clsx(classes)} style={style} />;
}

export default React.forwardRef(CardFactory);
