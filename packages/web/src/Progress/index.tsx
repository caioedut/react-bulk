import { forwardRef } from 'react';

import { ProgressFactory, ProgressProps } from '@react-bulk/core';

import useMap from '../useMap';

function Progress({ ...props }: ProgressProps, ref) {
  return <ProgressFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Progress, ProgressProps>(Progress);
