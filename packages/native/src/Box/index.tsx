import { forwardRef } from 'react';
import { View, useWindowDimensions } from 'react-native';

import { createBox } from '@react-bulk/core';
import { BoxProps } from '@react-bulk/core/types';

const Box = forwardRef((props: BoxProps, ref) => {
  const dimensions = useWindowDimensions();
  return createBox(props, ref, { native: true, dimensions }, View);
});

export default Box;
