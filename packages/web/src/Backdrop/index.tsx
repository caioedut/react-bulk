import { forwardRef } from 'react';

import { BackdropFactory, BackdropProps } from '@react-bulk/core';

import useMap from '../useMap';

function Backdrop({ ...props }: BackdropProps, ref) {
  return <BackdropFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Backdrop, BackdropProps>(Backdrop);
