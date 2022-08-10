import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { SelectFactory, SelectProps } from '@react-bulk/core';

import useMap from '../useMap';

export type SelectPropsNative = ViewProps & SelectProps;

function Select({ ...props }: SelectPropsNative, ref) {
  return <SelectFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Select, SelectProps>(Select);
