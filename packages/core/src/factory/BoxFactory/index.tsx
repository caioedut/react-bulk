import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import bindings from '../../props/bindings';
import factory from '../../props/factory';
import get from '../../props/get';
import merge from '../../props/merge';
import { customStyleProps } from '../../styles/jss';
import { BoxProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import clsx from '../../utils/clsx';

function BoxFactory({ className, stylist, children, map, ...props }: FactoryProps & BoxProps, ref) {
  const theme = useTheme();
  const options = theme.components.Box;
  const { web, native, dimensions, Text, View } = map;

  // Extends from default props
  props = factory(props, options.defaultProps);

  let {
    accessibility,
    align,
    alignContent,
    alignItems,
    basis,
    center,
    column,
    component,
    direction,
    flex,
    grow,
    hidden,
    invisible,
    justify,
    justifyContent,
    justifyItems,
    noRootStyles,
    noWrap,
    order,
    platform,
    position,
    reverse,
    row,
    shrink,
    wrap,
    style,
    rawStyle,
    ...rest
  } = props;

  // Platform specific props
  if (platform) {
    Object.keys(platform).forEach((item) => {
      if (map[item] || item === '*') {
        Object.assign(rest, merge({}, platform[item]));
      }
    });
  }

  // Extract style props
  const styleProps: any[] = [];
  for (const prop of customStyleProps) {
    if (prop in rest) {
      styleProps.push({ [prop]: rest[prop] });
      delete rest[prop];
    }
  }

  style = [
    position && { position },

    typeof invisible === 'boolean' && { opacity: invisible ? 0 : 1 },

    // Flex Container
    direction && { flexDirection: direction },
    row && { flexDirection: reverse ? 'row-reverse' : 'row', flexWrap: 'wrap' },
    column && { flexDirection: reverse ? 'column-reverse' : 'column' },

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

    hidden && { display: 'none' },
  ];

  // Apply responsive styles
  for (const breakpoint of Object.entries(theme.breakpoints)) {
    const [name, minWidth]: any = breakpoint;
    const ptStyle = get(name, style);

    if (ptStyle && dimensions.width >= minWidth) {
      style.push(ptStyle);
    }
  }

  const styleRoot = useStylist({
    avoid: noRootStyles,
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styles = [styleRoot, stylist];
  const processed = createStyle({ style, theme });
  styles.push(processed);

  if (native) {
    rest.style = merge(styles, rawStyle);
  }

  if (web) {
    rest.style = merge(rawStyle);
    rest.className = clsx(styles, className);
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
