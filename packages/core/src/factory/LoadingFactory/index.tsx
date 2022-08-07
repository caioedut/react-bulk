import React from 'react';

import { LoadingProps } from '../../types';
import clsx from '../../utils/clsx';
import IconFactory from '../IconFactory';

function LoadingFactory({ speed, className, style, map, ...rest }: LoadingProps | any, ref: any) {
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
