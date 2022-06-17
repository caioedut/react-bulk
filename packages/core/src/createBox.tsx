import React from 'react';

import { BoxProps } from '../types';
import { useTheme } from './ReactBulk';
import createStyle from './createStyle';
import bindings from './props/bindings';
import get from './props/get';
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

  style = [
    // Flex Container
    flexbox && {
      display: `${typeof flexbox === 'boolean' ? 'flex' : flexbox}`,
      flexDirection: 'row',
    },
    direction && { flexDirection: direction },
    wrap && { flexWrap: typeof wrap === 'boolean' ? (wrap ? 'wrap' : 'nowrap') : wrap },
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
  ];

  // Apply responsive styles
  for (const breakpoint of Object.entries(theme.breakpoints)) {
    const [name, minWidth]: any = breakpoint;
    const ptStyle = get(name, style);

    if (ptStyle && dimensions.width >= minWidth) {
      style.push(ptStyle);
    }
  }

  const processed = createStyle({ style: style });

  if (processed) {
    // Web: CSS Class Name
    if (typeof processed === 'string') {
      className = clsx(processed, className);
    }

    // Native: Style Object
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
