import React from 'react';

import { BoxFactory, FactoryProps, ScrollableProps, clsx } from '@react-bulk/core';

function ScrollableFactory({ horizontal, className, style, map, ...rest }: FactoryProps & ScrollableProps, ref: any) {
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
