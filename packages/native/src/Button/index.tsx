import { forwardRef } from 'react';
import { TouchableOpacityProps } from 'react-native';

import ButtonFactory from '@react-bulk/core/src/factory/ButtonFactory';
import { ButtonProps } from '@react-bulk/core/src/types';

import map from '../map';

export type ButtonPropsNative = TouchableOpacityProps & ButtonProps;

function Button({ ...props }: ButtonPropsNative, ref) {
  return <ButtonFactory map={map} ref={ref} {...props} />;
}

export default forwardRef(Button);
