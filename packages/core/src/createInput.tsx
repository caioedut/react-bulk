import Platform from './Platform';
import { useTheme } from './ThemeProvider';
import getStyle from './getStyle';
import jss from './styles/jss';

export default function createText({ label, size, disabled, style, ...rest }: any, ref: any, map: any) {
  const theme = useTheme();

  const { web, native } = Platform;
  const { Box, Text, Input, ios } = map;

  const styleX = jss([
    {
      fontSize: theme.rem(1),
      lineHeight: 1.25,

      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,

      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
      borderRadius: theme.shape.borderRadius,

      paddingTop: theme.rem(0.5),
      paddingBottom: theme.rem(0.5),
      paddingLeft: theme.rem(0.75),
      paddingRight: theme.rem(0.75),

      margin: 0,
      width: '100%',
    },

    web && { fontFamily: 'inherit' },

    disabled && {
      cursor: 'not-allowed',
      opacity: 0.75,
    },

    size === 'small' && {
      fontSize: theme.rem(0.875),
      paddingTop: theme.rem(0.5, theme.rem(0.875)),
      paddingBottom: theme.rem(0.5, theme.rem(0.875)),
      paddingLeft: theme.rem(0.75, theme.rem(0.875)),
      paddingRight: theme.rem(0.75, theme.rem(0.875)),
    },

    size === 'large' && {
      fontSize: theme.rem(1.25),
      paddingTop: theme.rem(0.5, theme.rem(1.25)),
      paddingBottom: theme.rem(0.5, theme.rem(1.25)),
      paddingLeft: theme.rem(0.75, theme.rem(1.25)),
      paddingRight: theme.rem(0.75, theme.rem(1.25)),
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
      <Box component={Input} {...rest} style={styleX} />
    </>
  );
}
