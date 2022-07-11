import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import SelectFactory from '@react-bulk/core/src/factory/SelectFactory';
import { SelectProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type SelectPropsNative = ViewProps & SelectProps;

function Select({ ...props }: SelectPropsNative, ref) {
  const map = useMap();

  return <SelectFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Select);
