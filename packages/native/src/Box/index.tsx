import { forwardRef } from 'react';
import { View } from 'react-native';

import { createComponent } from '@react-bulk/core';

const Box = forwardRef((props: Object, ref: any) => {
  return createComponent(props, ref, View);
});

export default Box;
