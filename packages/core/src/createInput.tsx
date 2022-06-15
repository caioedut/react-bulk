import { InputProps } from '../types';
import Platform from './Platform';
import { useTheme } from './ReactBulk';
import getStyle from './getStyle';
import jss from './styles/jss';

export default function createText({ label, size, style, ...rest }: InputProps | any, ref: any, map: any) {
  const theme = useTheme();

  const { web, native } = Platform;
  const { Box, Text, Input, ios } = map;
  const { disabled } = rest;

  const styleX = jss([
    {
      fontSize: theme.rem(1),
      lineHeight: 1.25,

      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
      borderRadius: theme.shape.borderRadius,

      paddingVertical: theme.rem(0.5),
      paddingHorizontal: theme.rem(0.6),

      margin: 0,
      width: '100%',
    },

    size === 'small' && {
      fontSize: theme.rem(0.875),
      paddingVertical: theme.rem(0.5, theme.rem(0.875)),
      paddingHorizontal: theme.rem(0.6, theme.rem(0.875)),
    },

    size === 'large' && {
      fontSize: theme.rem(1.25),
      paddingVertical: theme.rem(0.5, theme.rem(1.25)),
      paddingHorizontal: theme.rem(0.6, theme.rem(1.25)),
    },

    disabled && {
      backgroundColor: theme.colors.background.secondary,
      borderColor: theme.colors.background.disabled,
      opacity: 0.75,
    },

    web && disabled && { cursor: 'not-allowed' },

    web && {
      fontFamily: 'inherit',
      transitionProperty: 'box-shadow',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease',

      '&:focus': {
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
      },
    },

    style,
  ]);

  if (native) {
    // Calculate full height (for iOS)
    const pt = getStyle(styleX, 'paddingTop') ?? getStyle(styleX, 'paddingVertical') ?? getStyle(styleX, 'padding') ?? 0;
    const pb = getStyle(styleX, 'paddingBottom') ?? getStyle(styleX, 'paddingVertical') ?? getStyle(styleX, 'padding') ?? 0;
    const bt = getStyle(styleX, 'borderTopWidth') ?? getStyle(styleX, 'borderWidth') ?? 0;
    const bb = getStyle(styleX, 'borderBottomWidth') ?? getStyle(styleX, 'borderWidth') ?? 0;
    const fs = getStyle(styleX, 'fontSize');
    const lh = getStyle(styleX, 'lineHeight');
    styleX.height = styleX.height ?? pt + pb + bt + bb + fs * lh;

    if (ios) {
      delete styleX.lineHeight;
    }
  }

  return (
    <>
      {Boolean(label) && <Text>{label}</Text>}
      <Box ref={ref} component={Input} {...rest} style={styleX} />
    </>
  );
}
