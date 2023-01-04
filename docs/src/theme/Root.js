import React from 'react';

import ReactBulk from '@react-bulk/web';

export default function Root({ children }) {
  return <ReactBulk>{children}</ReactBulk>;
}
