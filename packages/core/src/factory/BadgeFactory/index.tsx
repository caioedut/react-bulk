import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { BadgeProps } from '../../types';
import global from '../../utils/global';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

const BadgeFactory = React.memo<BadgeProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Badge;
    const { web, native } = global.mapping;

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
    } = factory2(props, options);

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 0.75,
        small: 0.875,
        medium: 1,
        large: 1.25,
        xlarge: 1.625,
      });
    }

    const absolute = top || bottom || left || right;
    const fontSize = theme.rem(size);
    const baseSize = theme.rem(1.25, fontSize);
    const halfSize = baseSize / 2;

    labelStyle = [
      {
        fontSize: halfSize,
      },

      web && {
        lineHeight: native ? halfSize : 1,
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
      },

      top && { top: -halfSize },
      bottom && { bottom: -halfSize },
      left && { left: -halfSize },
      right && { right: -halfSize },

      style,
    ];

    return (
      <BoxFactory ref={ref} style={style} stylist={[variants.root, stylist]} {...rest}>
        {!dot && (
          <TextFactory style={labelStyle} stylist={[variants.label]}>
            {value ?? children ?? ''}
          </TextFactory>
        )}
      </BoxFactory>
    );
  }),
);

BadgeFactory.displayName = 'BadgeFactory';

export default BadgeFactory;
