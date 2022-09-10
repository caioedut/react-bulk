import { forwardRef } from 'react';

import { ButtonFactory, ButtonProps } from '@react-bulk/core';

import useMap from '../useMap';

function Button({ ...props }: ButtonProps, ref) {
  return <ButtonFactory ref={ref} activeOpacity={0.75} {...props} map={useMap()} />;
}

export default forwardRef<typeof Button, ButtonProps>(Button);
