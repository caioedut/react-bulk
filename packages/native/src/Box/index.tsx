import { forwardRef } from 'react';
import { View } from 'react-native';

import { createComponent } from '@react-bulk/core';

const Box = forwardRef((props: any, ref: any) => {
  return createComponent(View, props, ref);
});

export default Box;
