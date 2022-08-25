import { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';

import { BoxFactory, BoxProps } from '@react-bulk/core';

import useMap from '../useMap';

function Box({ ...props }: BoxProps, ref) {
  if ((props.onPress || props.onPressIn || props.onPressOut || props.onClick) && !props.component) {
    // @ts-ignore
    props.activeOpacity = props.activeOpacity ?? 1;
    props.component = TouchableOpacity;
  }

  return <BoxFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Box, BoxProps>(Box);
