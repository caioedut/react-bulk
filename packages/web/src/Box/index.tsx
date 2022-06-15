import { forwardRef } from 'react';

import { createBox } from '@react-bulk/core';
import { BoxProps } from '@react-bulk/core/types';

const Box = forwardRef((props: BoxProps, ref) => {
  return createBox(props, ref, { web: true }, 'div');
});

export default Box;
