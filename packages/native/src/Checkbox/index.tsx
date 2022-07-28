import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { CheckboxFactory } from '@react-bulk/core';
import { CheckboxProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type CheckboxPropsNative = ViewProps & CheckboxProps;

function Checkbox({ ...props }: CheckboxPropsNative, ref) {
  const map = useMap();

  return <CheckboxFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Checkbox);
