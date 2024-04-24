import ReactBulk from '@react-bulk/native';
import { registerRootComponent } from 'expo';

import Main from './src/main';

function App() {
  return (
    <ReactBulk
      theme={{
        typography: {
          fontSize: 16,
        },
      }}
    >
      <Main />
    </ReactBulk>
  );
}

registerRootComponent(App);
