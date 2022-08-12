import { forwardRef } from 'react';

import { SelectFactory, SelectProps } from '@react-bulk/core';

import useMap from '../useMap';

function Select({ ...props }: SelectProps, ref) {
  return <SelectFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Select, SelectProps>(Select);
