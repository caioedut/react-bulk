import React from 'react';

import { ScrollableProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function ScrollableFactory({ horizontal, className, style, map, ...rest }: ScrollableProps | any, ref: any) {
  const { web, ScrollView } = map;
  const classes: any[] = ['rbk-scrollable', className];

  style = [
    { flex: 1 },

    web && horizontal && { overflowX: 'auto' },
    web && !horizontal && { overflowY: 'auto' },
    web && { scrollBehavior: 'smooth' },

    style,
  ];

  return (
    <BoxFactory
      map={map}
      ref={ref}
      component={ScrollView}
      {...rest}
      className={clsx(classes)}
      style={style}
      platform={{
        native: { horizontal },
      }}
    />
  );
}

export default React.forwardRef(ScrollableFactory);
