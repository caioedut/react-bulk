import React from 'react';

import { BoxProps, FactoryProps, bindings, clsx, createStyle, get, merge, useTheme } from '@react-bulk/core';

import { customStyleProps } from '../../styles/jss';

function BoxFactory({ className, children, map, ...props }: FactoryProps & BoxProps, ref) {
  const theme = useTheme();
  const { web, native, dimensions, Text, View } = map;
  const classes: any[] = [className];

  // Extends from default props
  props = { ...theme.components.Box.defaultProps, ...props };

  let {
    accessibility,
    align,
    alignContent,
    alignItems,
    basis,
    block,
    center,
    column,
    component,
    direction,
    flex,
    flexbox,
    flow,
    grow,
    hidden,
    justify,
    justifyContent,
    justifyItems,
    noWrap,
    order,
    platform,
    reverse,
    row,
    shrink,
    wrap,
    style,
    rawStyle,
    ...rest
  } = props;

  // Extract style props
  const styleProps: any[] = [];
  for (const prop of customStyleProps) {
    if (prop in rest) {
      styleProps.push({ [prop]: rest[prop] });
      delete rest[prop];
    }
  }

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

    styleProps,

    style,

    native && rawStyle,

    hidden && { display: 'none !important' },
  ];

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
      rest.style = processed;
    }
  }

  if (web) {
    rest.className = clsx(classes);
    rest.style = merge(rawStyle);
  }

  console.log('accessibility', accessibility);

  // Aria / Acessibility
  if (accessibility) {
    if (web) {
      rest['aria-placeholder'] = accessibility?.hint;
      rest['aria-label'] = accessibility?.label;
      rest['role'] = accessibility?.role;

      rest['aria-checked'] = accessibility?.state?.checked;
      rest['aria-disabled'] = accessibility?.state?.disabled;
      rest['aria-expanded'] = accessibility?.state?.expanded;
      rest['aria-selected'] = accessibility?.state?.selected;
      rest['aria-busy'] = accessibility?.state?.busy;

      rest['aria-valuemax'] = accessibility?.value?.max;
      rest['aria-valuemin'] = accessibility?.value?.min;
      rest['aria-valuenow'] = accessibility?.value?.now;
      rest['aria-valuetext'] = accessibility?.value?.text;
    }

    if (native) {
      rest.accessible = true;
      rest.accessibilityHint = accessibility?.hint;
      rest.accessibilityLabel = accessibility?.label;
      rest.accessibilityRole = accessibility?.role;
      rest.accessibilityState = accessibility?.state;
      rest.accessibilityValue = accessibility?.value;
    }
  }

  // Platform specific props
  if (platform) {
    Object.keys(platform).forEach((item) => {
      if (map[item] || item === '*') {
        Object.assign(rest, merge({}, platform[item]));
      }
    });
  }

  rest = bindings(rest);

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
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
}

export default React.forwardRef(BoxFactory);
