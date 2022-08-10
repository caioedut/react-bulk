import React from 'react';

import { BoxFactory, CollapseProps, FactoryProps, clsx } from '@react-bulk/core';

function CollapseFactory({ className, map, ...rest }: FactoryProps & CollapseProps, ref: any) {
  const classes: any[] = ['rbk-collapse', className];

  return <BoxFactory map={map} ref={ref} {...rest} className={clsx(classes)} />;
}

export default React.forwardRef(CollapseFactory);
