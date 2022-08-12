import { forwardRef } from 'react';

import { ButtonFactory } from '@react-bulk/core';

import { WebButtonProps } from '../types';
import useMap from '../useMap';

function Button({ ...props }: WebButtonProps, ref) {
  return <ButtonFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Button, WebButtonProps>(Button);
