import { forwardRef } from 'react';
import { View } from 'react-native';

import { createBox } from '@react-bulk/core';
import { BoxProps } from '@react-bulk/core/types';

const Box = forwardRef((props: BoxProps, ref) => {
  return createBox(props, ref, { native: true }, View);
});

export default Box;
