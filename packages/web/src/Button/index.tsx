import React, { forwardRef } from 'react';

import { createButton } from '@react-bulk/core';

import map from '../../map';

export type ButtonProps = {
  autoFocus: boolean;
  disabled: boolean;
  children: React.ReactNode;
};

const Button = forwardRef((props: ButtonProps, ref) => {
  return createButton(props, ref, map);
});

export default Button;
