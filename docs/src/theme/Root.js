import React from 'react';

import { ReactBulk } from '@react-bulk/web';

export default function Root({ children }) {
  let theme = 'light';

  if (typeof localStorage !== 'undefined') {
    theme = localStorage.getItem('theme') || 'light';
  }

  return <ReactBulk theme={theme}>{children}</ReactBulk>;
}
