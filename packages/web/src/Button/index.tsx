import { ComponentPropsWithRef, forwardRef } from 'react';

import { createButton } from '@react-bulk/core';
import { ButtonProps } from '@react-bulk/core/src/types';

import map from '../../map';

type ButtonPropsWeb = ComponentPropsWithRef<'button'> &
  ButtonProps & {
    type?: 'button' | 'reset' | 'submit';
  };

const Button = forwardRef(({ ...props }: ButtonPropsWeb, ref) => {
  props.style = [props.style];

  if (!props.type) {
    props.type = 'button';
  }

  return createButton(props, ref, map);
});

export default Button;
