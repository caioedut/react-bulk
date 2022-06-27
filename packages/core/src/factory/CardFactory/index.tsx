import React from 'react';

import { useTheme } from '../../ReactBulk';
import { CardProps } from '../../types';
import BoxFactory from '../BoxFactory';

function CardFactory({ style, map, ...rest }: CardProps | any, ref: any) {
  const theme = useTheme();

  style = [
    {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.shape.borderRadius,
      p: 3,
    },
    style,
  ];

  return <BoxFactory map={map} ref={ref} {...rest} style={style} />;
}

export default React.forwardRef(CardFactory);
