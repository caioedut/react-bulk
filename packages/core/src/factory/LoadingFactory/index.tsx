import React from 'react';

import { FactoryProps, IconFactory, LoadingProps, clsx } from '@react-bulk/core';

function LoadingFactory({ speed, className, style, map, ...rest }: FactoryProps | LoadingProps, ref: any) {
  const { web } = map;
  const classes: any[] = ['rbk-loading', className];

  style = [
    web && {
      animation: `spin ${speed ?? '1s'} linear infinite`,
    },

    style,
  ];

  return <IconFactory ref={ref} map={map} {...rest} name="Spinner" className={clsx(classes)} style={style} />;
}

export default React.forwardRef(LoadingFactory);
