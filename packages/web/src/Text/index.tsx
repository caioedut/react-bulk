import { forwardRef } from 'react';

import { TextFactory, TextProps } from '@react-bulk/core';

import useMap from '../useMap';

function Text({ ...props }: TextProps, ref) {
  return <TextFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Text, TextProps>(Text);
