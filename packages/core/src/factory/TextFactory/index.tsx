import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { TextProps } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const TextFactory = React.memo<TextProps>(
  forwardRef(({ stylist, ...props }, ref) => {
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
      oblique,
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
    } = factory2(props, options);

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
        Number(numberOfLines) === 1 && {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },

      web &&
        numberOfLines > 1 && {
          display: '-webkit-box',
          '-webkit-line-clamp': `${numberOfLines}`,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },

      style,
    ];

    return <BoxFactory ref={ref} component={Text} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles />;
  }),
);

TextFactory.displayName = 'TextFactory';

export default TextFactory;
