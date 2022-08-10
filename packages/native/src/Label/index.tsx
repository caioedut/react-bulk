import { forwardRef } from 'react';

import { LabelFactory, LabelProps } from '@react-bulk/core';

import useMap from '../useMap';

function Label({ ...props }: LabelProps, ref) {
  return <LabelFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Label, LabelProps>(Label);
