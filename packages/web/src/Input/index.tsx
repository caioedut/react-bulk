import { ComponentPropsWithRef, forwardRef } from 'react';

import InputFactory from '@react-bulk/core/src/factory/InputFactory';
import { InputProps } from '@react-bulk/core/src/types';

import map from '../map';

export type InputPropsWeb = ComponentPropsWithRef<'input'> &
  InputProps & {
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

function Input({ ...props }: InputPropsWeb, ref) {
  if (!props.type) {
    props.type = 'text';
  }

  if (props.secure) {
    delete props.secure;
    props.type = 'password';
  }

  return <InputFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Input);
