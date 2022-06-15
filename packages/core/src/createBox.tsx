import React from 'react';

import createStyle from './createStyle';
import bindings from './props/bindings';
import jss from './styles/jss';
import clsx from './utils/clsx';

export default function createBox(
  { component, className, flexbox, direction, wrap, flow, justify, align, alignContent, flex, style, ...rest }: any,
  ref: any,
  map: any,
  defaultComponent: any = null,
) {
  const styleProp: any = {};

  const styleX = createStyle({
    style: jss([
      flexbox && { display: `${typeof flexbox === 'boolean' ? 'flex' : flexbox}` },
      direction && { flexDirection: direction },
      wrap && { flexWrap: wrap },
      flow && { flexFlow: flow },
      justify && { justifyContent: justify },
      align && { alignItems: align },
      alignContent && { alignContent },
      flex && { flex: 1 },
      style,
    ]),
  });

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
