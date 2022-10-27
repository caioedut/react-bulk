import ReactBulk from '@react-bulk/core';

import Main from './src';

const theme = {
  typography: {
    fontSize: 16,
  },
};

export default function App() {
  return (
    <ReactBulk theme={theme}>
      <Main />
    </ReactBulk>
  );
}
