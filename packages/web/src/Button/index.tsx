import { ComponentPropsWithRef, forwardRef } from 'react';

import { ButtonFactory, ButtonProps } from '@react-bulk/core';

import useMap from '../useMap';

export type ButtonPropsWeb = ComponentPropsWithRef<'button'> &
  ButtonProps & {
    type?: 'button' | 'reset' | 'submit';
  };

function Button({ ...props }: ButtonPropsWeb, ref) {
  const map = useMap();

  return <ButtonFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Button);
