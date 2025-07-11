import React from 'react';

import { ThemeEditProps } from '@react-bulk/core';
import { ReactBulk } from '@react-bulk/web';
import ReactDOM from 'react-dom/client';

import Main from './src/main';

const theme: ThemeEditProps = {
  typography: {
    fontSize: 16,
  },
};

function App() {
  return (
    <ReactBulk locale="en-US" theme={theme}>
      <Main />
    </ReactBulk>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
