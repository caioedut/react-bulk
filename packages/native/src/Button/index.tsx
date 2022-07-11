import { forwardRef } from 'react';
import { TouchableOpacityProps } from 'react-native';

import ButtonFactory from '@react-bulk/core/src/factory/ButtonFactory';
import { ButtonProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type ButtonPropsNative = TouchableOpacityProps & ButtonProps;

function Button({ ...props }: ButtonPropsNative, ref) {
  const map = useMap();

  return <ButtonFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Button);
