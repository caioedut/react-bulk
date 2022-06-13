import React, { forwardRef } from 'react';

import { createButton } from '@react-bulk/core';
import { ButtonProps } from '@react-bulk/core/types';

import map from '../../map';

const Button = forwardRef(({ ...props }: ButtonProps, ref) => {
  if (props.onClick) {
    props.onPress = props.onClick;
    delete props.onClick;
  }

  return createButton(props, ref, map);
});

export default Button;
