import { forwardRef } from 'react';

import { GridFactory, GridProps } from '@react-bulk/core';

import useMap from '../useMap';

function Grid({ ...props }: GridProps, ref) {
  return <GridFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Grid, GridProps>(Grid);
