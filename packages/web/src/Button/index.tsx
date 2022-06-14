import React, { forwardRef } from 'react';

import { createButton, useTheme } from '@react-bulk/core';
import { ButtonProps } from '@react-bulk/core/types';

import map from '../../map';

type ButtonPropsWeb = ButtonProps & {
  type?: 'button' | 'reset' | 'submit';
};

const Button = forwardRef(({ elevation, ...props }: ButtonPropsWeb, ref) => {
  const theme = useTheme();

  props.style = [props.style];

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

  if (elevation) {
    props.style.unshift({
      boxShadow: theme.mixins.shadows[elevation],
    });
  }

  return createButton(props, ref, map);
});

export default Button;
