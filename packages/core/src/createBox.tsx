import React from 'react';

import { BoxProps } from '../types';
import { useTheme } from './ReactBulk';
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
    ...props
  }: BoxProps | any,
  ref: any,
  map: any,
  defaultComponent: any = null,
) {
  const theme = useTheme();

  const { dimensions } = map;

  const styleX = jss([
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
  ]);

  let pointFound = false;
  const breakpoints: any = Object.entries(theme.breakpoints).reverse();

  for (const [name, bkpt] of breakpoints) {
    if (!pointFound && styleX[name] && dimensions.width >= bkpt) {
      Object.assign(styleX, jss(styleX[name]));
      pointFound = true;
      break;
    }

    delete styleX[name];
  }

  const processed = createStyle({ style: styleX });

  if (processed) {
    if (typeof processed === 'string') {
      className = clsx(processed, className);
    }

    if (typeof processed === 'object') {
      props.style = processed;
    }
  }

  if (className) {
    props.className = clsx(className);
  }

  props = bindings(props);

  const Component = component || defaultComponent;
  return <Component {...props} ref={ref} />;
}
