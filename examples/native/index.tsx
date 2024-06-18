import { ThemeEditProps } from '@react-bulk/core';
import { ReactBulk } from '@react-bulk/native';
import { registerRootComponent } from 'expo';

import Main from './src/main';

const theme: ThemeEditProps = {
  typography: {
    fontSize: 16,
  },
};

function App() {
  return (
    <ReactBulk theme={theme}>
      <Main />
    </ReactBulk>
  );
}

registerRootComponent(App);
