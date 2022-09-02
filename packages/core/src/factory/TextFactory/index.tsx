import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, TextProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function TextFactory({ className, map, ...props }: FactoryProps & TextProps, ref) {
  const theme = useTheme();
  const { web, native, Text } = map;

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
    defaultStyle,
    ...rest
  } = factory(props, theme.components.Text.defaultProps);

  if (native) {
    rest.includeFontPadding = false;
    rest.textAlignVertical = 'center';

    if (numberOfLines) {
      rest.numberOfLines = numberOfLines;
    }
  }

  const styleRoot = useStylist({
    name: theme.components.Text.name,
    style: defaultStyle,
  });

  const styleState = useStylist({
    style: [
      color && { color },

      variant === 'h1' && { fontSize: theme.rem(2.6) },
      variant === 'h2' && { fontSize: theme.rem(2.1) },
      variant === 'h3' && { fontSize: theme.rem(1.7) },
      variant === 'h4' && { fontSize: theme.rem(1.4) },
      variant === 'h5' && { fontSize: theme.rem(1.2) },
      variant === 'h6' && { fontSize: theme.rem(1.1) },

      variant === 'title' && { fontSize: theme.rem(1.25) },
      variant === 'subtitle' && { fontSize: theme.rem(1.125) },
      variant === 'caption' && { fontSize: theme.rem(0.75) },

      size && { fontSize: theme.rem(size) },
      weight && { fontWeight: weight },

      typeof center === 'boolean' && { textAlign: center ? 'center' : native ? 'auto' : 'initial' },
      typeof left === 'boolean' && { textAlign: left ? 'left' : native ? 'auto' : 'initial' },
      typeof right === 'boolean' && { textAlign: right ? 'right' : native ? 'auto' : 'initial' },
      typeof justify === 'boolean' && { textAlign: justify ? 'justify' : native ? 'auto' : 'initial' },
      typeof smallCaps === 'boolean' && { fontVariant: smallCaps ? 'small-caps' : native ? undefined : 'initial' },

      typeof bold === 'boolean' && { fontWeight: bold ? 'bold' : 'normal' },
      typeof italic === 'boolean' && { fontStyle: italic ? 'italic' : 'normal' },

      transform && { textTransform: transform },

      web &&
        numberOfLines > 0 && {
          display: '-webkit-box',
          '-webkit-line-clamp': `${numberOfLines}`,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
    ],
  });

  const styles = [styleRoot, styleState, className];

  return <BoxFactory map={map} ref={ref} component={Text} {...rest} className={styles} />;
}

export default React.forwardRef(TextFactory);
