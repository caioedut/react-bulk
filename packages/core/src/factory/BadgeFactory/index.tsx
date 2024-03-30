import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { BadgeProps, RequiredSome } from '../../types';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

const BadgeFactory = React.memo<BadgeProps>(
  forwardRef(({ children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Badge;

    // Extends from default props
    let {
      bottom,
      color,
      dot,
      left,
      right,
      size,
      top,
      value,
      // Styles,
      variants,
      labelStyle,
      style,
      ...rest
    } = factory2<RequiredSome<BadgeProps, 'color' | 'size'>>(props, options);

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 1.25,
        small: 1.75,
        medium: 2.25,
        large: 2.75,
        xlarge: 3.25,
      });
    }

    const absolute = top || bottom || left || right;

    const baseSize = theme.rem(size as number) / 2;
    const halfSize = baseSize / 2;

    labelStyle = [
      {
        fontSize: halfSize,
      },

      labelStyle,
    ];

    style = [
      {
        backgroundColor: color,
        borderRadius: halfSize,
      },

      absolute && {
        position: 'absolute',
      },

      !dot && {
        minHeight: baseSize,
        minWidth: baseSize,
        paddingVertical: Math.round(baseSize * 0.222222),
        paddingHorizontal: Math.round(baseSize * 0.333333),
      },

      top && { top: -halfSize },
      bottom && { bottom: -halfSize },
      left && { left: -halfSize },
      right && { right: -halfSize },

      style,
    ];

    return (
      <BoxFactory ref={ref} style={style} variants={{ root: variants.root }} {...rest}>
        {!dot && (
          <TextFactory style={labelStyle} variants={{ root: variants.label }}>
            {value ?? children ?? ''}
          </TextFactory>
        )}
      </BoxFactory>
    );
  }),
);

BadgeFactory.displayName = 'BadgeFactory';

export default BadgeFactory;
