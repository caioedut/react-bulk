import React from 'react';

import createStyle from './createStyle';
import jss from './styles/jss';

export default function createBox({ component, style, ...rest }: any, ref: any, map: any, defaultComponent: any = null) {
  const styleProp: any = {};
  const styleX = createStyle({ style: jss(style) });

  if (styleX) {
    if (typeof styleX === 'string') {
      styleProp.className = `${styleX || ''} ${rest.className || ''}`.trim();
    }

    if (typeof styleX === 'object') {
      styleProp.style = styleX;
    }
  }

  const Component = component || defaultComponent;
  return <Component {...rest} ref={ref} {...styleProp} />;
}
