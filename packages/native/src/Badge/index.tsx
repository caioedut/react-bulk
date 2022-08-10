import { forwardRef } from 'react';

import { BadgeFactory, BadgeProps } from '@react-bulk/core';

import useMap from '../useMap';

function Badge({ ...props }: BadgeProps, ref) {
  return <BadgeFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Badge, BadgeProps>(Badge);
