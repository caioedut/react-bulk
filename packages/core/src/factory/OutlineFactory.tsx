import React, { forwardRef, useState } from 'react';

import useTheme from '../hooks/useTheme';
import extract from '../props/extract';
import factory2 from '../props/factory2';
import { OutlineProps, RequiredSome } from '../types';
import clone from '../utils/clone';
import global from '../utils/global';
import BoxFactory from './BoxFactory';

const OutlineFactory = React.memo<OutlineProps>(
  forwardRef(({ children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Outline;
    const { web, native } = global.mapping;

    const [focused, setFocused] = useState(false);

    // Extends from default props
    let {
      color,
      size,
      visible,
      // Styles
      variants,
      style,
      // Events
      onFocus,
      onBlur,
      ...rest
    } = factory2<RequiredSome<OutlineProps, 'color' | 'size' | 'visible'>>(props, options);

    color = theme.color(color, 0.3);
    const boxShadow = `0 0 0 ${size}px ${color}`;

    let handleFocus;
    let handleBlur;

    if (native && visible === 'auto') {
      handleFocus = (...args) => {
        setFocused(true);
        onFocus?.(...args);
      };

      handleBlur = (...args) => {
        setFocused(false);
        onBlur?.(...args);
      };
    }

    style = [
      { position: 'relative' },

      web && color && visible === true && { boxShadow },

      web && color && visible === 'auto' && { '&:focus': { boxShadow } },

      style,
    ];

    const borderRadiusStyle = extract(
      [
        'corners',
        'borderRadius',
        'borderTopStartRadius',
        'borderTopEndRadius',
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomStartRadius',
        'borderBottomEndRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
      ],
      clone(rest),
      clone(style),
    );

    return (
      <BoxFactory
        ref={ref}
        style={style}
        variants={{ root: variants.root }}
        {...rest}
        onFocus={handleFocus ?? onFocus}
        onBlur={handleBlur ?? onBlur}
      >
        {(visible === true || focused) && (
          <BoxFactory
            position="absolute"
            border={`${size}px solid ${color}`}
            style={[borderRadiusStyle, { inset: -size }]}
          />
        )}

        {children}
      </BoxFactory>
    );
  }),
);

OutlineFactory.displayName = 'OutlineFactory';

export default OutlineFactory;
