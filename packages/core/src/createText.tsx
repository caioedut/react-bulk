import Platform from './Platform';
import { useTheme } from './ReactBulk';
import { TextProps } from './types';

export default function createText(
  { variant, size, color, center, bold, italic, oblique, smallCaps, invisible, transform, numberOfLines, style, ...rest }: TextProps | any,
  ref: any,
  map: any,
) {
  const theme = useTheme();

  const { web, native } = Platform;
  const { Box, Text } = map;

  const styleX = [
    {
      color: color ?? theme.colors.text.primary,
      fontSize: theme.rem(1),
      lineHeight: theme.shape.lineHeight,
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
    bold && { fontWeight: 'bold' },
    italic && { fontStyle: 'italic' },
    oblique && { fontStyle: 'oblique' },
    smallCaps && { fontVariant: 'small-caps' },
    invisible && { opacity: 0 },
    transform && { textTransform: transform },

    web && { display: 'inline-block' },

    web &&
      numberOfLines > 0 && {
        display: '-webkit-box',
        '-webkit-line-clamp': `${numberOfLines}`,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
      },

    style,
  ];

  const props: any = {};
  if (native && numberOfLines) {
    props.numberOfLines = numberOfLines;
  }

  return <Box ref={ref} component={Text} {...rest} style={styleX} {...props} />;
}
