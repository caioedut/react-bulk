import { forwardRef } from 'react';

import { IconFactory, IconProps } from '@react-bulk/core';

import useMap from '../useMap';

function Icon({ ...props }: IconProps, ref) {
  return <IconFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Icon, IconProps>(Icon);
