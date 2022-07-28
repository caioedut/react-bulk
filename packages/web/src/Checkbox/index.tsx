import { ComponentPropsWithRef, forwardRef } from 'react';

import { CheckboxFactory } from '@react-bulk/core';
import { CheckboxProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type CheckboxPropsWeb = ComponentPropsWithRef<'div'> & CheckboxProps;

function Checkbox({ ...props }: CheckboxPropsWeb, ref) {
  const map = useMap();

  return <CheckboxFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Checkbox);
