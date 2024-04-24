import React from 'react';

import ReactBulk from '@react-bulk/web';
import ReactDOM from 'react-dom/client';

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

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
