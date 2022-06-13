import { forwardRef } from 'react';

import createComponent from '@react-bulk/core';

const Box = forwardRef((props, ref) => {
  return createComponent('div', props, ref);
});

export default Box;
