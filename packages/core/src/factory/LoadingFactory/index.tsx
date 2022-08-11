import React from 'react';

import { FactoryProps, IconFactory, LoadingProps, clsx, useTheme } from '@react-bulk/core';

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
