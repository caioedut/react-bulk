import React, { forwardRef, useMemo } from 'react';

import useTheme from '../../hooks/useTheme';
import bindings from '../../props/bindings';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import get from '../../props/get';
import merge from '../../props/merge';
import { styleProps } from '../../styles/constants';
import jss from '../../styles/jss';
import sheet from '../../styles/sheet';
import { BoxProps } from '../../types';
import clone from '../../utils/clone';
import clsx from '../../utils/clsx';
import defined from '../../utils/defined';
import global from '../../utils/global';

const BoxFactory = React.memo<BoxProps>(
  forwardRef(({ platform, className, stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Box;
    const { web, native, Button, Text, View, useDimensions } = global.mapping;

    // Extends from default props
    props = useMemo(() => factory2<BoxProps>(props, options), [props, options]);

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
      mount,
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

    pressable =
      pressable ?? Boolean(props.onPress || props.onLongPress || props.onPressIn || props.onPressOut || props.onClick);

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
      row && {
        flexDirection: reverse ? 'row-reverse' : 'row',
        flexWrap: 'wrap',
      },

      column && {
        flexDirection: reverse ? 'column-reverse' : 'column',
      },

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
      defined(flex) && { flex: Number(flex) },

      web && pressable && { cursor: 'pointer' },

      clone(style),

      stylesFromProps,

      hidden && {
        display: 'none',
        opacity: 0,
        overflow: 'hidden',
      },
    ];

    // #HACK: fix flex overflow
    if (Number(get('flex', style) ?? 0)) {
      style.unshift({ minWidth: 0, minHeight: 0 });
    }

    const styles = [...(!noRootStyles ? variants.root : []), stylist];
    const responsiveStyle = extract(Object.keys(theme.breakpoints), style);

    // Native only: refresh cometta styles when have responsive styles
    useDimensions(native && Object.keys(responsiveStyle).length > 0);

    if (style) {
      if (web) {
        styles.push(sheet(style));
      }

      if (native) {
        styles.push(jss(style));
      }
    }

    // Apply responsive styles
    for (const breakpoint of Object.entries(responsiveStyle)) {
      const [bkptName, bkptStyle] = breakpoint;

      if (bkptStyle) {
        const mediaStyle = {
          [`@media (min-width: ${theme.breakpoints[bkptName]}px)`]: bkptStyle,
        };

        if (web) {
          styles.push(sheet(mediaStyle));
        }

        if (native) {
          styles.push(jss(mediaStyle));
        }
      }
    }

    if (native) {
      styles.push(jss(rawStyle));
      rest.style = styles;
    }

    if (web) {
      rest.style = jss(rawStyle);
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

    if (mount === false) {
      return null;
    }

    return (
      <Component ref={ref} {...rest} {...componentProps}>
        {React.Children.map(children, (child) => {
          const isText = ['string', 'number'].includes(typeof child);

          if (!child && !isText) {
            return null;
          }

          if (isText) {
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
