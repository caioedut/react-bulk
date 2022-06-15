import React from 'react';

import createStyle from './createStyle';
import bindings from './props/bindings';
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

  const props = bindings(rest);

  const Component = component || defaultComponent;
  return <Component {...props} ref={ref} {...styleProp} />;
}
