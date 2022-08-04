import React from 'react';

import Platform from '../../Platform';
import { LoadingProps } from '../../types';
import clsx from '../../utils/clsx';
import IconFactory from '../IconFactory';

function LoadingFactory({ speed, className, style, map, ...rest }: LoadingProps | any, ref: any) {
  const { web } = Platform;

  style = [
    web && {
      animation: `spin ${speed ?? '1s'} linear infinite`,
    },

    style,
  ];

  return <IconFactory ref={ref} map={map} {...rest} name="Spinner" className={clsx('rbk-loading', className)} style={style} />;
}

export default React.forwardRef(LoadingFactory);
