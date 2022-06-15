import React, { forwardRef } from 'react';

import { createInput } from '@react-bulk/core';

import map from '../../map';

const Input = forwardRef(({ ...props }: any, ref) => {
  return createInput(props, ref, map);
});

export default Input;
