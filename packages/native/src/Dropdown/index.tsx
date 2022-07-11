import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import DropdownFactory from '@react-bulk/core/src/factory/DropdownFactory';
import { DropdownProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type DropdownPropsNative = ViewProps & DropdownProps;

function Dropdown({ ...props }: DropdownPropsNative, ref) {
  const map = useMap();

  return <DropdownFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Dropdown);
