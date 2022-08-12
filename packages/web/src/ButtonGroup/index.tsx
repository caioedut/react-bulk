import { forwardRef } from 'react';

import { ButtonGroupFactory, ButtonGroupProps } from '@react-bulk/core';

import useMap from '../useMap';

function ButtonGroup({ ...props }: ButtonGroupProps, ref) {
  return <ButtonGroupFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof ButtonGroup, ButtonGroupProps>(ButtonGroup);
