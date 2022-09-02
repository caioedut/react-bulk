import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import bindings from '../../props/bindings';
import get from '../../props/get';
import merge from '../../props/merge';
import { customStyleProps } from '../../styles/jss';
import { BoxProps, FactoryProps } from '../../types';
import clsx from '../../utils/clsx';

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
    invisible,
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
    block && {
      marginLeft: 0,
      marginRight: 0,
      width: '100%',
    },

    web && block && { display: 'block' },

    typeof invisible === 'boolean' && { opacity: invisible ? 0 : 1 },

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

    styleProps,

    native && rawStyle,

    hidden && { display: web ? 'none !important' : 'none' },
  ];

  // Apply responsive styles
  for (const breakpoint of Object.entries(theme.breakpoints)) {
    const [name, minWidth]: any = breakpoint;
    const ptStyle = get(name, style);

    if (ptStyle && dimensions.width >= minWidth) {
      style.push(ptStyle);
    }
  }

  if (native) {
    const arrayed = Array.isArray(className) ? className : [className];
    style.unshift(...arrayed.filter((item) => item && typeof item === 'object'));
  }

  const processed = createStyle({ style, theme });

  if (processed) {
    // Web: CSS Class Name
    if (web) {
      classes.push(processed);
    }

    // Native: Style Object
    if (native) {
      rest.style = processed;
    }
  }

  if (web) {
    rest.className = clsx(classes);
    rest.style = merge(rawStyle);
  }

  // Aria / Accessibility
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
