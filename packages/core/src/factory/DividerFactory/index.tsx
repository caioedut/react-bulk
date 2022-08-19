import React from 'react';

import { useTheme } from '../../ReactBulk';
import { DividerProps, FactoryProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function DividerFactory({ className, map, ...props }: FactoryProps & DividerProps, ref: any) {
  const theme = useTheme();
  const classes: any[] = ['rbk-divider', className];

  // Extends from default props
  props = { ...theme.components.Divider.defaultProps, ...props };

  let {
    //
    color,
    opacity,
    size,
    vertical,
    style,
    ...rest
  } = props;

  style = [
    {
      backgroundColor: color,
      opacity,
    },

    vertical && { width: size, height: '100%' },

    !vertical && { height: size },

    style,
  ];

  return <BoxFactory map={map} ref={ref} {...rest} className={clsx(classes)} style={style} />;
}

export default React.forwardRef(DividerFactory);
