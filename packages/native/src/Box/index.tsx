import { forwardRef } from 'react';
import { TouchableHighlight } from 'react-native';

import { BoxFactory, BoxProps } from '@react-bulk/core';

import useMap from '../useMap';

function Box({ ...props }: BoxProps, ref) {
  if ((props?.onPress || props?.onPressIn || props?.onPressOut || props?.onClick) && !props?.component) {
    props.component = TouchableHighlight;
  }

  return <BoxFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Box, BoxProps>(Box);
