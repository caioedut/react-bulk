import { useTheme } from './ThemeProvider';

export default function createButton({ children, style, ...rest }: any, ref: any, map: any) {
  const theme = useTheme();
  const { Box, Text, Button } = map;

  if (typeof children === 'string') {
    children = <Text>{children}</Text>;
  }

  const styleX = [
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
    },
    style,
  ];

  return (
    <Box component={Button} {...rest} style={styleX}>
      {children}
    </Box>
  );
}
