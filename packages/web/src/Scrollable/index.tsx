import { forwardRef } from 'react';

import { ScrollableFactory, ScrollableProps } from '@react-bulk/core';

import useMap from '../useMap';

function Scrollable({ ...props }: ScrollableProps, ref) {
  return <ScrollableFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Scrollable, ScrollableProps>(Scrollable);
