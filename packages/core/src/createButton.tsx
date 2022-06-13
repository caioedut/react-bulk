export default function createButton({ children, ...rest }: any, ref: any, map: any) {
  const { Box, Text, Button } = map;

  if (typeof children === 'string') {
    children = <Text>{children}</Text>;
  }

  return (
    <Box component={Button} {...rest}>
      {children}
    </Box>
  );
}
