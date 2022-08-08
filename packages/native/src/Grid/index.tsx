import { forwardRef } from 'react';

import { GridFactory, GridProps } from '@react-bulk/core';

import useMap from '../useMap';

function Grid({ ...props }: GridProps, ref) {
  const map = useMap();

  return <GridFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Grid);
