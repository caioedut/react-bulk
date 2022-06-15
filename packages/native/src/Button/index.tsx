import React, { forwardRef } from 'react';

import { createButton } from '@react-bulk/core';
import { ButtonProps } from '@react-bulk/core/types';

import map from '../../map';

const Button = forwardRef((props: ButtonProps, ref) => {
  return createButton(props, ref, map);
});

export default Button;
