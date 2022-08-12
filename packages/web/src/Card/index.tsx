import { forwardRef } from 'react';

import { CardFactory, CardProps } from '@react-bulk/core';

import useMap from '../useMap';

function Card({ ...props }: CardProps, ref) {
  return <CardFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Card, CardProps>(Card);
