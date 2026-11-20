import { ThemeEditProps } from '@react-bulk/core';
import { ReactBulk } from '@react-bulk/expo';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

const theme: ThemeEditProps = {
  typography: {
    fontSize: 16,
  },
  components: {
    Card: {
      defaultProps: {
        shadow: 4,
      },
    },
  },
};

export default function RootLayout() {
  return (
    <ReactBulk locale="en-US" theme={theme}>
      <Stack />
    </ReactBulk>
  );
}
