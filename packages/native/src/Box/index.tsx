import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { BoxFactory, BoxProps } from '@react-bulk/core';

import useMap from '../useMap';

export type BoxPropsNative = ViewProps & BoxProps;

function Box({ ...props }: BoxPropsNative, ref) {
  return <BoxFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Box);
