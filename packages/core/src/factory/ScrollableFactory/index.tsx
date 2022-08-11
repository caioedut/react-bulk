import React from 'react';

import { BoxFactory, FactoryProps, ScrollableProps, clsx, useTheme } from '@react-bulk/core';

function ScrollableFactory({ className, map, ...props }: FactoryProps & ScrollableProps, ref: any) {
  const theme = useTheme();
  const { web, ScrollView } = map;
  const classes: any[] = ['rbk-scrollable', className];

  // Extends from default props
  props = { ...theme.components.Scrollable.defaultProps, ...props };

  let { horizontal, style, ...rest } = props;

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
