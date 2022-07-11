import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import BoxFactory from '@react-bulk/core/src/factory/BoxFactory';
import { BoxProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type BoxPropsNative = ViewProps & BoxProps;

function Box({ ...props }: BoxPropsNative, ref) {
  const map = useMap();

  return <BoxFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Box);
