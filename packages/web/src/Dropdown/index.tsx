import { ComponentPropsWithRef, forwardRef } from 'react';

import DropdownFactory from '@react-bulk/core/src/factory/DropdownFactory';
import { DropdownProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type DropdownPropsWeb = ComponentPropsWithRef<'div'> & DropdownProps;

function Dropdown({ ...props }: DropdownPropsWeb, ref) {
  const map = useMap();

  return <DropdownFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Dropdown);
