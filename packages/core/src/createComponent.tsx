import React from 'react';

import parseStyle from './style';

export default function createComponent({ component, style, ...rest }: any, ref: any, defaultComponent: any = null) {
  const Component = component || defaultComponent;
  return <Component {...rest} ref={ref} style={parseStyle(style)} />;
}
