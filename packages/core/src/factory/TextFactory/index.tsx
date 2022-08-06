import React from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import { TextProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function TextFactory(
  {
    variant,
    size,
    color,
    center,
    left,
    right,
    justify,
    weight,
    bold,
    italic,
    oblique,
    smallCaps,
    invisible,
    transform,
    numberOfLines,
    className,
    style,
    map,
    ...rest
  }: TextProps | any,
  ref,
) {
  const theme = useTheme();

  const { web, native } = Platform;
  const { Text } = map;

  style = [
    {
      color: color ?? theme.colors.text.primary,
      fontSize: theme.rem(1),
      lineHeight: theme.typography.lineHeight,
      textDecorationLine: 'none',
    },

    variant === 'h1' && { fontSize: theme.rem(2.5) },
    variant === 'h2' && { fontSize: theme.rem(2.0) },
    variant === 'h3' && { fontSize: theme.rem(1.6) },
    variant === 'h4' && { fontSize: theme.rem(1.3) },
    variant === 'h5' && { fontSize: theme.rem(1.1) },
    variant === 'h6' && { fontSize: theme.rem(1) },

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

  if (native && numberOfLines) {
    rest.numberOfLines = numberOfLines;
  }

  return <BoxFactory ref={ref} component={Text} {...rest} className={clsx('rbk-text', className)} style={style} map={map} />;
}

export default React.forwardRef(TextFactory);
