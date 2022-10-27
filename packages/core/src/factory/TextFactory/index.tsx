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

  return (
    <BoxFactory map={map} innerRef={innerRef} component={Text} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles />
  );
}

export default React.memo(TextFactory);
