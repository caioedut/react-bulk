import { useTheme } from './ThemeProvider';
import getStyle from './getStyle';

export default function createButton({ variant, style, children, ...rest }: any, ref: any, map: any) {
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
      lineHeight: 1.15,

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
    variant === 'text' && { borderColor: theme.colors.common.trans },
    (variant === 'outline' || variant === 'text') && { backgroundColor: theme.colors.common.trans, color },
    style,
  ];

  const textColor = getStyle(styleX, 'color');
  const fontSize = getStyle(styleX, 'fontSize');

  if (typeof children === 'string') {
    children = (
      <Box component={Text} style={{ color: textColor, fontSize }}>
        {children}
      </Box>
    );
  }

  return (
    <Box component={Button} {...rest} style={styleX}>
      {children}
    </Box>
  );
}
