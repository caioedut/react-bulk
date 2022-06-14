import React, { forwardRef } from 'react';

import { createText } from '@react-bulk/core';
import { TextProps } from '@react-bulk/core/types';

import map from '../../map';

const Text = forwardRef((props: TextProps, ref) => {
  return createText(props, ref, map);
});

export default Text;
