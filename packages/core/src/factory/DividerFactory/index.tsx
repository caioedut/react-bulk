import React from 'react';

import { DividerProps } from '../../../typings';
import { useTheme } from '../../ReactBulk';
import BoxFactory from '../BoxFactory';

function DividerFactory({ color, size, opacity, vertical, style, map, ...rest }: DividerProps | any, ref: any) {
  const theme = useTheme();

  style = [
    {
      backgroundColor: color ?? theme.colors.text.secondary,
      opacity: opacity ?? 0.25,
    },

    vertical && { width: size ?? 1, height: '100%' },

    !vertical && { height: size ?? 1 },

    style,
  ];

  return <BoxFactory map={map} ref={ref} {...rest} style={style} />;
}

export default React.forwardRef(DividerFactory);
