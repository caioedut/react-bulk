import { forwardRef } from 'react';

import { BoxFactory, BoxProps } from '@react-bulk/core';

import useMap from '../useMap';

function Box({ ...props }: BoxProps, ref) {
  return <BoxFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Box, BoxProps>(Box);
