import React from 'react';

import { BoxFactory, FactoryProps, TextProps, clsx, useTheme } from '@react-bulk/core';

function TextFactory({ className, map, ...props }: FactoryProps & TextProps, ref) {
  const theme = useTheme();
  const { web, native, Text } = map;
  const classes: any[] = ['rbk-text', className];

  // Extends from default props
  props = { ...theme.components.Text.defaultProps, ...props };

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
    style,
    ...rest
  } = props;

  style = [
    {
      color,
      fontSize: theme.rem(1),
      textDecorationLine: 'none',
    },

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
    center && { textAlign: 'center' },
    left && { textAlign: 'left' },
    right && { textAlign: 'right' },
    justify && { textAlign: 'justify' },
    weight && { fontWeight: weight },
    bold && { fontWeight: 'bold' },
    italic && { fontStyle: 'italic' },
    oblique && { fontStyle: 'oblique' },
    smallCaps && { fontVariant: 'small-caps' },
    invisible && { opacity: 0 },
    transform && { textTransform: transform },

    web && {
      display: 'block',
      '& .rbk-text': { display: 'inline' },
    },

    web &&
      numberOfLines > 0 && {
        display: '-webkit-box',
        '-webkit-line-clamp': `${numberOfLines}`,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
      },

    style,
  ];

  if (native) {
    rest.includeFontPadding = false;
    rest.textAlignVertical = 'center';

    if (numberOfLines) {
      rest.numberOfLines = numberOfLines;
    }
  }

  return <BoxFactory ref={ref} component={Text} {...rest} className={clsx(classes)} style={style} map={map} />;
}

export default React.forwardRef(TextFactory);
