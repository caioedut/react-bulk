import { forwardRef } from 'react';
import { View } from 'react-native';

import { createBox } from '@react-bulk/core';

const Box = forwardRef((props: any, ref) => {
  return createBox(props, ref, { native: true }, View);
});

export default Box;
