import React from 'react';

import { useTheme } from '@react-bulk/core';

import { CardProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function CardFactory({ className, style, map, ...rest }: CardProps | any, ref: any) {
  const theme = useTheme();

  style = [
    {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.shape.borderRadius,
      p: 3,
    },
    style,
  ];

  return <BoxFactory map={map} ref={ref} {...rest} className={clsx('rbk-card', className)} style={style} />;
}

export default React.forwardRef(CardFactory);
