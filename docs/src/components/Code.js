import React from 'react';

import { Box, Card, Divider, Text } from '@react-bulk/web';

export default function Code({ children }) {
  // const [active, setActive] = useState('code');
  // const [editing, setEditing] = useState(false);

  return (
    <Card border="primary" mb={3}>
      <Box mt={-3}>
        <Text bold size={0.65} color="primary" py={1}>
          PREVIEW
        </Text>
      </Box>

      <Divider mx={-3} mb={3} />

      {children}
    </Card>
  );

  // return (
  //   <Card>
  //     <Box row justifyContent="end" m={-1}>
  //       <Button size="xsmall" variant="outline" onPress={() => setEditing(!editing)}>
  //         {editing ? '▶' : '❮❯'}
  //       </Button>
  //     </Box>
  //
  //     <Divider mx={-3} mt={3} />
  //
  //     <Box>{children}</Box>
  //   </Card>
  // );
}
