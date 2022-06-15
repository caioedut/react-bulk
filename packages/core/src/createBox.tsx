import React from 'react';

import { BoxProps } from '../types';
import createStyle from './createStyle';
import bindings from './props/bindings';
import jss from './styles/jss';
import clsx from './utils/clsx';

export default function createBox(
  {
    component,
    className,
    flexbox,
    direction,
    wrap,
    flow,
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
    flex,
    order,
    grow,
    shrink,
    basis,
    align,
    justify,
    style,
    ...rest
  }: BoxProps | any,
  ref: any,
  map: any,
  defaultComponent: any = null,
) {
  const styleProp: any = {};

  const styleX = createStyle({
    style: jss([
      // Flex Container
      flexbox && { display: `${typeof flexbox === 'boolean' ? 'flex' : flexbox}` },
      direction && { flexDirection: direction },
      wrap && { flexWrap: wrap },
      flow && { flexFlow: flow },
      justifyContent && { justifyContent },
      justifyItems && { alignItems },
      alignContent && { alignContent },
      alignItems && { alignItems },

      // Flex Item
      flex && { flex: 1 },
      order && { order },
      grow && { grow },
      shrink && { shrink },
      basis && { basis },
      align && { alignSelf: align },
      justify && { justifySelf: justify },

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
