import React, { forwardRef } from 'react';

import { createText } from '@react-bulk/core';

import map from '../../map';

const Text = forwardRef((props: any, ref) => {
  return createText(props, ref, map);
});

export default Text;
