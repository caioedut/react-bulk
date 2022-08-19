import React from 'react';

import { useTheme } from '../../ReactBulk';
import { FactoryProps, LoadingProps } from '../../types';
import clsx from '../../utils/clsx';
import IconFactory from '../IconFactory';

function LoadingFactory({ className, map, ...props }: FactoryProps | LoadingProps, ref: any) {
  const theme = useTheme();
  const { web } = map;
  const classes: any[] = ['rbk-loading', className];

  // Extends from default props
  props = { ...theme.components.Loading.defaultProps, ...props };

  let { speed, style, ...rest } = props;

  style = [
    web && {
      animation: `spin ${speed} linear infinite`,
    },

    style,
  ];

  return <IconFactory ref={ref} map={map} {...rest} name="Spinner" className={clsx(classes)} style={style} />;
}

export default React.forwardRef(LoadingFactory);
