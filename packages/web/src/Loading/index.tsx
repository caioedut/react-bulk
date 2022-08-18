import { forwardRef } from 'react';

import { LoadingFactory, LoadingProps } from '@react-bulk/core';

import useMap from '../useMap';

function Loading({ ...props }: LoadingProps, ref) {
  return <LoadingFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Loading, LoadingProps>(Loading);
