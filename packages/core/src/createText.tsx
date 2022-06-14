import { useTheme } from './ThemeProvider';

export default function createText({ style, ...rest }: any, ref: any, map: any) {
  const theme = useTheme();

  const { Box, Text } = map;

  const styleX = [
    {
      color: theme.colors.text.primary,
      fontSize: theme.rem(1),
    },
    style,
  ];

  return <Box component={Text} {...rest} style={styleX} />;
}
