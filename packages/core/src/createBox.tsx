import React from 'react';

import stylex from './stylex';

export default function createBox({ component, style, ...rest }: any, ref: any, defaultComponent: any = null) {
  const Component = component || defaultComponent;
  return <Component {...rest} ref={ref} style={stylex(style)} />;
}
