import { forwardRef } from 'react';
import { View } from 'react-native';

import { createComponent } from '@react-bulk/core';

const Box = forwardRef((props, ref) => {
  return createComponent(props, ref, View);
});

export default Box;
