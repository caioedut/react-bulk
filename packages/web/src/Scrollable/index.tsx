import React, { forwardRef } from 'react';

import { createScrollable } from '@react-bulk/core';
import { ScrollableProps } from '@react-bulk/core/types';

import map from '../../map';

const Scrollable = forwardRef(({ ...props }: ScrollableProps, ref) => {
  return createScrollable(props, ref, map);
});

export default Scrollable;
