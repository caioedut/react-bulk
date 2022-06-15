import React, { forwardRef } from 'react';

import { createInput } from '@react-bulk/core';
import { InputProps } from '@react-bulk/core/types';

import map from '../../map';

type InputPropsWeb = InputProps & {
  type?:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url';
};

const Input = forwardRef(({ ...props }: InputPropsWeb, ref) => {
  if (!props.type) {
    props.type = 'text';
  }

  if (props.secure) {
    props.type = 'password';
  }

  return createInput(props, ref, map);
});

export default Input;
