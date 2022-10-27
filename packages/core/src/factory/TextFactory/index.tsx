import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { FactoryProps, TextProps } from '../../types';
import BoxFactory from '../BoxFactory';

function TextFactory({ stylist, map, innerRef, ...props }: FactoryProps & TextProps) {
  const theme = useTheme();
  const options = theme.components.Text;
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
    // Styles
    variants,
    style,
    ...rest
  } = factory2(props, options);

  if (native) {
    rest.includeFontPadding = false;
    rest.textAlignVertical = 'center';

    if (numberOfLines) {
      rest.numberOfLines = numberOfLines;
    }
  }

  style = [
    color && { color },

    size && { fontSize: theme.rem(size) },
    weight && { fontWeight: `${weight}` },

    typeof center === 'boolean' && { textAlign: center ? 'center' : native ? 'auto' : 'initial' },
    typeof left === 'boolean' && { textAlign: left ? 'left' : native ? 'auto' : 'initial' },
    typeof right === 'boolean' && { textAlign: right ? 'right' : native ? 'auto' : 'initial' },
    typeof justify === 'boolean' && { textAlign: justify ? 'justify' : native ? 'auto' : 'initial' },
    typeof smallCaps === 'boolean' && { fontVariant: smallCaps ? 'small-caps' : native ? undefined : 'initial' },

    typeof bold === 'boolean' && { fontWeight: bold ? 'bold' : 'normal' },
    typeof italic === 'boolean' && { fontStyle: italic ? 'italic' : 'normal' },

    transform && { textTransform: transform },

    web &&
      Number(numberOfLines) === 1 && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
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

  return (
    <BoxFactory map={map} innerRef={innerRef} component={Text} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles />
  );
}

export default React.memo(TextFactory);
