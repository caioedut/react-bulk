import React, { forwardRef, useMemo } from 'react';

import createStyle from '../../createStyle';
import useTheme from '../../hooks/useTheme';
import bindings from '../../props/bindings';
import factory2 from '../../props/factory2';
import get from '../../props/get';
import merge from '../../props/merge';
import { styleProps } from '../../styles/constants';
import { BoxProps } from '../../types';
import clsx from '../../utils/clsx';
import global from '../../utils/global';

const BoxFactory = React.memo<BoxProps>(
  forwardRef(({ platform, className, stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Box;
    const { web, native, useDimensions, Button, Text, View } = global.mapping;

    const dimensions = useDimensions();

    // Extends from default props
    props = useMemo(() => factory2(props, options), [props, options]);

    // Platform specific props
    if (platform) {
      Object.keys(platform).forEach((item) => {
        if (global.mapping[item] || item === '*') {
          Object.assign(props, merge({}, platform[item]));
        }
      });
    }

    let {
      accessibility,
      center,
      column,
      component,
      componentProps,
      flex,
      hidden,
      invisible,
      noRootStyles,
      noWrap,
      pressable,
      reverse,
      row,
      wrap,
      // Styles
      variants,
      style,
      rawStyle,
      ...rest
    } = props;

    rest = bindings(rest);

    pressable = pressable ?? Boolean(props.onPress || props.onLongPress || props.onPressIn || props.onPressOut || props.onClick);

    if (native && pressable && !component) {
      component = Button;
      rest.activeOpacity = rest.activeOpacity ?? 0.75;
    }

    // Extract styles from props
    const stylesFromProps: any[] = [];
    for (const prop of styleProps) {
      if (prop in rest) {
        stylesFromProps.push({ [prop]: rest[prop] });
        delete rest[prop];
      }
    }

    style = [
      typeof invisible === 'boolean' && { opacity: invisible ? 0 : 1 },

      // Flex Container
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

      // Flex Item
      typeof flex === 'boolean' && { flex: Number(flex) },

      web && pressable && { cursor: 'pointer' },

      style,

      stylesFromProps,

      hidden && {
        display: 'none',
        opacity: 0,
        overflow: 'hidden',
      },
    ];

    // Apply responsive styles
    for (const breakpoint of Object.entries(theme.breakpoints)) {
      const [name, minWidth]: any = breakpoint;
      const ptStyle = get(name, style);

      if (ptStyle && dimensions.width >= minWidth) {
        style.push(ptStyle);
      }
    }

    const styles = [!noRootStyles && variants.root, stylist];
    const processed = useMemo(() => createStyle({ style, theme }), [style, theme]);
    styles.push(processed);

    if (native) {
      rest.style = merge(styles, rawStyle);
    }

    if (web) {
      rest.style = merge(rawStyle);
      rest.className = clsx(styles, className);
    }

    if (pressable && !accessibility?.role) {
      accessibility = { ...Object(accessibility), role: 'button' };
    }

    // Aria / Accessibility
    if (accessibility) {
      if (web) {
        rest['aria-placeholder'] = accessibility?.hint;
        rest['aria-label'] = accessibility?.label;
        rest['role'] = accessibility?.role;

        rest['aria-checked'] = accessibility.state?.checked;
        rest['aria-disabled'] = accessibility.state?.disabled;
        rest['aria-expanded'] = accessibility.state?.expanded;
        rest['aria-selected'] = accessibility.state?.selected;
        rest['aria-busy'] = accessibility.state?.busy;

        rest['aria-valuemax'] = accessibility.value?.max;
        rest['aria-valuemin'] = accessibility.value?.min;
        rest['aria-valuenow'] = accessibility.value?.now;
        rest['aria-valuetext'] = accessibility.value?.text;
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

    const Component = component || View;

    return (
      <Component ref={ref} {...rest} {...componentProps}>
        {React.Children.map(children, (child) => {
          if (!child && !['string', 'number'].includes(typeof child)) {
            return null;
          }

          if (typeof children === 'string') {
            return <Text>{child}</Text>;
          }

          return child;
        })}
      </Component>
    );
  }),
);

BoxFactory.displayName = 'BoxFactory';

export default BoxFactory;
