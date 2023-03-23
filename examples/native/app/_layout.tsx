import ReactBulk from '@react-bulk/native';
import { Slot } from 'expo-router';

const theme = {
  typography: {
    fontSize: 16,
  },
};

export default function Layout() {
  return (
    <ReactBulk theme={theme}>
      <Slot />
    </ReactBulk>
  );
}
