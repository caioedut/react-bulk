import React from 'react';

import { BoxProps, FactoryProps, bindings, clsx, createStyle, get, merge, useTheme } from '@react-bulk/core';

import { customStyleProps } from '../../styles/jss';

function BoxFactory(
  {
    component,
    block,
    hidden,
    flexbox,
    direction,
    row,
    column,
    reverse,
    wrap,
    noWrap,
    flow,
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
    center,
    flex,
    order,
    grow,
    shrink,
    basis,
    align,
    justify,
    platform,
    className,
    style,
    rawStyle,
    children,
    map,
    ...props
  }: FactoryProps & BoxProps,
  ref,
) {
  const theme = useTheme();
  const { web, native, dimensions, Text, View } = map;
  const classes: any[] = [className];

  style = [
    { position: 'relative' },

    block && {
      marginLeft: 0,
      marginRight: 0,
      width: '100%',
    },

    web && block && { display: 'block' },

    // Flex Container
    flexbox && {
      display: `${typeof flexbox === 'boolean' ? 'flex' : flexbox}`,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'stretch',
    },

    direction && { flexDirection: direction },
    row && { flexDirection: reverse ? 'row-reverse' : 'row' },
    column && { flexDirection: reverse ? 'column-reverse' : 'column' },
    flow && { flexFlow: flow },

    wrap && typeof wrap !== 'boolean' && { flexWrap: wrap },
    typeof wrap === 'boolean' && { flexWrap: wrap ? 'wrap' : 'nowrap' },
    noWrap && { flexWrap: 'nowrap' },

    center && {
      justifyContent: 'center',
      justifyItems: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },

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

    native && rawStyle,

    hidden && { display: 'none !important' },
  ];

  // Custom style props
  for (const prop of customStyleProps) {
    if (prop in props) {
      style.push({ [prop]: props[prop] });
      delete props[prop];
    }
  }

  // Apply responsive styles
  for (const breakpoint of Object.entries(theme.breakpoints)) {
    const [name, minWidth]: any = breakpoint;
    const ptStyle = get(name, style);

    if (ptStyle && dimensions.width >= minWidth) {
      style.push(ptStyle);
    }
  }

  const hasFlex = ['flexDirection', 'flexWrap', 'flexFlow', 'justifyContent', 'justifyItems', 'alignContent', 'alignItems'].some((prop) =>
    get(prop, style),
  );

  if (hasFlex) {
    if (!get('display', style)) {
      style.push({ display: 'flex' });
    }

    if (!get('flexFlow', style)) {
      if (!get('flexDirection', style)) {
        style.push({ flexDirection: 'column' });
      }

      if (!get('flexWrap', style)) {
        style.push({ flexWrap: 'wrap' });
      }
    }

    // if (!get('alignContent', style)) {
    //   style.push({ alignContent: 'flex-start' });
    // }
  }

  const processed = createStyle({ style });

  if (processed) {
    // Web: CSS Class Name
    if (typeof processed === 'string') {
      classes.push(processed);
    }

    // Native: Style Object
    if (typeof processed === 'object') {
      props.style = processed;
    }
  }

  if (web) {
    props.className = clsx(classes);
    props.style = merge(rawStyle);
  }

  // Platform specific props
  if (platform) {
    Object.keys(platform).forEach((item) => {
      if (map[item] || item === '*') {
        Object.assign(props, merge({}, platform[item]));
      }
    });
  }

  props = bindings(props);

  if ([undefined, null, false, NaN].includes(children)) {
    children = null;
  }

  if (native && children) {
    if (typeof children === 'string') {
      children = <Text>{children}</Text>;
    }

    if (Array.isArray(children)) {
      children = children.map((child) => (typeof children === 'string' ? <Text>{child}</Text> : child));
    }
  }

  const Component = component || View;

  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
}

export default React.forwardRef(BoxFactory);
