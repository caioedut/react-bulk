import { forwardRef } from 'react';

import { createBox } from '@react-bulk/core';

const Box = forwardRef((props: any, ref) => {
  return createBox(props, ref, { web: true }, 'div');
});

export default Box;
