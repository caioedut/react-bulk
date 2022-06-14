import React, { forwardRef } from 'react';

import { createButton } from '@react-bulk/core';
import { ButtonProps } from '@react-bulk/core/types';

import map from '../../map';

type ButtonPropsWeb = ButtonProps & {
  type?: 'button' | 'reset' | 'submit';
};

const Button = forwardRef(({ ...props }: ButtonPropsWeb, ref) => {
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

  props.type = props.type || 'button';

  return createButton(props, ref, map);
});

export default Button;
