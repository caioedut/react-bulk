export default function createButton({ children, style, ...rest }: any, ref: any, map: any) {
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
    },
    style,
  ];

  return (
    <Box component={Button} {...rest} style={styleX}>
      {children}
    </Box>
  );
}
