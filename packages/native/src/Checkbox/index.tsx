import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { CheckboxFactory, CheckboxProps } from '@react-bulk/core';

import useMap from '../useMap';

export type CheckboxPropsNative = ViewProps & CheckboxProps;

function Checkbox({ ...props }: CheckboxPropsNative, ref) {
  return <CheckboxFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Checkbox);
