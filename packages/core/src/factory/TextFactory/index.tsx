import React, { cloneElement, forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import childrenize from '../../props/childrenize';
import factory2 from '../../props/factory2';
import get from '../../props/get';
import { TextProps } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const TextFactory = React.memo<TextProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Text;
    const { web, native, Text } = global.mapping;

    // Extends from default props
    let {
      bold,
      center,
      color,
      invisible,
      italic,
      justify,
      left,
      numberOfLines,
      right,
      size,
      smallCaps,
      transform,
      variant,
      weight,
      // Styles
      variants,
      style,
      ...rest
    } = factory2<TextProps>(props, options);

    if (native) {
      rest.includeFontPadding = false;

      if (numberOfLines) {
        rest.numberOfLines = numberOfLines;
      }
    }

    style = [
      color && { color },

      size && { fontSize: theme.rem(size) },
      weight && { fontWeight: `${weight}` },

      transform && { textTransform: transform },

      web &&
        Number(numberOfLines) > 1 && {
          display: '-webkit-box',
          '-webkit-line-clamp': `${numberOfLines}`,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },

      style,
    ];

    bold = get('bold', style) ?? bold;
    color = get('color', style) ?? color;
    weight = get('weight', style) ?? weight;
    const fontSize = get('fontSize', style, rest);
    const fontWeight = get('fontWeight', style, rest);

    return (
      <BoxFactory ref={ref} component={Text} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles>
        {/* Inherite some styles for each text child  */}
        {childrenize(children).map((child, key) => {
          if (child?.type === TextFactory) {
            child = cloneElement(child, { key, variant, bold, color, weight, fontSize, fontWeight, ...child.props });
          }

          return child;
        })}
      </BoxFactory>
    );
  }),
);

TextFactory.displayName = 'TextFactory';

export default TextFactory;
