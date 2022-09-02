import { forwardRef } from 'react';

import { TooltipFactory, TooltipProps } from '@react-bulk/core';

import useMap from '../useMap';

function Tooltip({ ...props }: TooltipProps, ref) {
  return <TooltipFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Tooltip, TooltipProps>(Tooltip);
