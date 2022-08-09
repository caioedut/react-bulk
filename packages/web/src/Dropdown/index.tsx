import { ComponentPropsWithRef, forwardRef } from 'react';

import { DropdownFactory, DropdownProps } from '@react-bulk/core';

import useMap from '../useMap';

export type DropdownPropsWeb = ComponentPropsWithRef<'div'> & DropdownProps;

function Dropdown({ ...props }: DropdownPropsWeb, ref) {
  return <DropdownFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Dropdown);
