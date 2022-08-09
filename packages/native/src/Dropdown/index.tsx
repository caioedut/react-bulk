import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { DropdownFactory, DropdownProps } from '@react-bulk/core';

import useMap from '../useMap';

export type DropdownPropsNative = ViewProps & DropdownProps;

function Dropdown({ ...props }: DropdownPropsNative, ref) {
  return <DropdownFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Dropdown);
