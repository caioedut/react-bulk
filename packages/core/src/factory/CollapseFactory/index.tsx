import React from 'react';

import { BoxFactory, CollapseProps, FactoryProps, clsx, useTheme } from '@react-bulk/core';

function CollapseFactory({ className, map, ...props }: FactoryProps & CollapseProps, ref: any) {
  const theme = useTheme();
  const classes: any[] = ['rbk-collapse', className];

  // Extends from default props
  props = { ...theme.components.Collapse.defaultProps, ...props };

  let { ...rest } = props;

  return <BoxFactory map={map} ref={ref} {...rest} className={clsx(classes)} />;
}

export default React.forwardRef(CollapseFactory);
