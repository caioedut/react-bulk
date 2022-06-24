import { forwardRef } from 'react';
import { Text, View, ViewProps, useWindowDimensions } from 'react-native';

import BoxFactory from '@react-bulk/core/src/factory/BoxFactory';
import { BoxProps } from '@react-bulk/core/src/types';

export type BoxPropsNative = ViewProps & BoxProps;

function Box({ ...props }: BoxPropsNative, ref) {
  const dimensions = useWindowDimensions();
  return <BoxFactory ref={ref} {...props} map={{ native: true, dimensions, Text, View }} />;
}

export default forwardRef(Box);
