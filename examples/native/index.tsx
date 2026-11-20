import { ThemeEditProps } from '@react-bulk/core';
import { ReactBulk } from '@react-bulk/native';
import { registerRootComponent } from 'expo';

import Main from './src/main';

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

function App() {
  return (
    <ReactBulk locale="en-US" theme={theme}>
      <Main />
    </ReactBulk>
  );
}

registerRootComponent(App);
