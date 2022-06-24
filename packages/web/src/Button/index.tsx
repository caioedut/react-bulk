import { ComponentPropsWithRef, forwardRef } from 'react';

import ButtonFactory from '@react-bulk/core/src/factory/ButtonFactory';
import { ButtonProps } from '@react-bulk/core/src/types';

import map from '../map';

export type ButtonPropsWeb = ComponentPropsWithRef<'button'> &
  ButtonProps & {
    type?: 'button' | 'reset' | 'submit';
  };

function Button({ ...props }: ButtonPropsWeb, ref) {
  props.style = [props.style];

  if (!props.type) {
    props.type = 'button';
  }

  return <ButtonFactory map={map} ref={ref} {...props} />;
}

export default forwardRef(Button);
