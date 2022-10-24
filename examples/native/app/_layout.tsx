import ReactBulk from '@react-bulk/core';
import { Stack } from 'expo-router';

const theme = {
  typography: {
    fontSize: 16,
  },
};

export default function Layout() {
  return (
    <ReactBulk theme={theme}>
      <Stack />
    </ReactBulk>
  );
}
