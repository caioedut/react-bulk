import React from 'react';

import createStyle from './createStyle';
import bindings from './props/bindings';
import jss from './styles/jss';
import clsx from './utils/clsx';

export default function createBox({ component, className, style, ...rest }: any, ref: any, map: any, defaultComponent: any = null) {
  const styleProp: any = {};
  const styleX = createStyle({ style: jss(style) });

  if (styleX) {
    if (typeof styleX === 'string') {
      className = clsx(styleX, className);
    }

    if (typeof styleX === 'object') {
      styleProp.style = styleX;
    }
  }

  const props = bindings(rest);

  if (className) {
    props.className = clsx(className);
  }

  const Component = component || defaultComponent;
  return <Component {...props} ref={ref} {...styleProp} />;
}
