import React, { forwardRef } from 'react';

import { createButton } from '@react-bulk/core';
import { ButtonProps } from '@react-bulk/core/types';

import map from '../../map';

const Button = forwardRef(({ ...props }: ButtonProps, ref) => {
  if (props.onPress) {
    props.onClick = props.onPress;
    delete props.onPress;
  }

  if (props.onPressIn) {
    props.onMouseDown = props.onPressIn;
    delete props.onPressIn;
  }

  if (props.onPressOut) {
    props.onMouseUp = props.onPressOut;
    delete props.onPressOut;
  }

  return createButton(props, ref, map);
});

export default Button;
