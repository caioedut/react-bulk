import { forwardRef } from 'react';

import { DropdownFactory, DropdownProps } from '@react-bulk/core';

import useMap from '../useMap';

function Dropdown({ ...props }: DropdownProps, ref) {
  return <DropdownFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Dropdown, DropdownProps>(Dropdown);
