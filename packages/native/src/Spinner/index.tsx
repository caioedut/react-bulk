import { forwardRef } from 'react';

import { SpinnerFactory, SpinnerProps } from '@react-bulk/core';

import useMap from '../useMap';

function Spinner({ ...props }: SpinnerProps, ref) {
  return <SpinnerFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Spinner, SpinnerProps>(Spinner);
