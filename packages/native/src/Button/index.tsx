import { forwardRef } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { ButtonFactory, ButtonProps } from '@react-bulk/core';

import useMap from '../useMap';

export type ButtonPropsNative = TouchableOpacityProps & ButtonProps;

function Button({ ...props }: ButtonPropsNative, ref) {
  return <ButtonFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Button);
