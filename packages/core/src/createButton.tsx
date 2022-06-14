import { useTheme } from './ThemeProvider';
import getStyle from './getStyle';

export default function createButton({ variant, size, block, loading, style, children, ...rest }: any, ref: any, map: any) {
  const theme = useTheme();

  const { Box, Text, Button } = map;
  const { disabled } = rest;

  const color = theme.colors.primary.main;

  const styleX = [
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',

      fontSize: theme.rem(1),
      lineHeight: 1.25,

      backgroundColor: color,
      color: theme.colors.common.white,
      cursor: disabled ? 'not-allowed' : 'pointer',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color,
      borderRadius: theme.shape.borderRadius,

      paddingTop: theme.rem(0.5),
      paddingBottom: theme.rem(0.5),
      paddingLeft: theme.rem(1),
      paddingRight: theme.rem(1),
    },

    map.web && { fontFamily: 'inherit' },

    block && { width: '100%' },

    disabled && { opacity: 0.75 },

    variant === 'text' && { borderColor: theme.colors.common.trans },

    (variant === 'outline' || variant === 'text') && { backgroundColor: theme.colors.common.trans, color },

    size === 'small' && {
      fontSize: theme.rem(0.875),
      paddingTop: theme.rem(0.25),
      paddingBottom: theme.rem(0.25),
      paddingLeft: theme.rem(0.5),
      paddingRight: theme.rem(0.5),
    },

    size === 'large' && {
      fontSize: theme.rem(1.25),
      paddingTop: theme.rem(0.75),
      paddingBottom: theme.rem(0.75),
      paddingLeft: theme.rem(1.25),
      paddingRight: theme.rem(1.25),
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
