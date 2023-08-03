import React from 'react';

import { ThemeEditProps } from '@react-bulk/core';
import ReactBulk from '@react-bulk/web';
import ReactDOM from 'react-dom/client';

import Main from './src/main';

const theme: ThemeEditProps = {
  typography: {
    fontSize: 16,
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactBulk theme={theme}>
    <Main />
  </ReactBulk>,
);
