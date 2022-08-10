import { forwardRef } from 'react';

import { DividerFactory, DividerProps } from '@react-bulk/core';

import useMap from '../useMap';

function Divider({ ...props }: DividerProps, ref) {
  return <DividerFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Divider, DividerProps>(Divider);
