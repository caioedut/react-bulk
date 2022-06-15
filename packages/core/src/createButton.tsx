import Platform from './Platform';
import { useTheme } from './ThemeProvider';
import getStyle from './getStyle';

export default function createButton({ variant, size, block, loading, style, children, ...rest }: any, ref: any, map: any) {
  const theme = useTheme();

  const { web } = Platform;
  const { Box, Text, Button } = map;
  const { disabled } = rest;

  const styleX = [
    {
      position: 'relative',

      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',

      fontSize: theme.rem(1),
      lineHeight: 1.25,

      backgroundColor: theme.colors.primary.main,
      color: theme.colors.common.white,
      cursor: 'pointer',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
      borderRadius: theme.shape.borderRadius,

      margin: 0,
      paddingTop: theme.rem(0.5),
      paddingBottom: theme.rem(0.5),
      paddingLeft: theme.rem(1),
      paddingRight: theme.rem(1),

      '&:hover': { backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.9) },
    },

    block && { width: '100%' },

    disabled && {
      cursor: 'not-allowed',
      opacity: 0.75,
    },

    variant === 'text' && { borderColor: theme.colors.common.trans },

    (variant === 'outline' || variant === 'text') && {
      backgroundColor: theme.colors.common.trans,
      color: theme.colors.primary.main,

      '&:hover': { backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.1) },
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

    web && {
      fontFamily: 'inherit',
      transitionProperty: 'background-color, box-shadow',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease',

      '&:focus': {
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
      },
    },

    style,
  ];

  const textStyleX = {
    color: getStyle(styleX, 'color'),
    fontSize: getStyle(styleX, 'fontSize'),
  };

  if (typeof children === 'string') {
    children = (
      <Box component={Text} style={[textStyleX, disabled && { opacity: 0.75 }, loading && { opacity: 0 }]}>
        {children}
      </Box>
    );
  }

  return (
    <Box component={Button} {...rest} style={styleX}>
      {children}
      {loading && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bg: theme.hex2rgba(theme.colors.background.primary, 0.1),
          }}
        >
          <Text style={textStyleX}>...</Text>
        </Box>
      )}
    </Box>
  );
}
