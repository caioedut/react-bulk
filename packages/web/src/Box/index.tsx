import { forwardRef } from 'react';

import { createComponent } from '@react-bulk/core';

const Box = forwardRef((props: any, ref: any) => {
  return createComponent(props, ref, 'div');
});

export default Box;
