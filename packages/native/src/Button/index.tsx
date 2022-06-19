import { forwardRef } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { createButton } from '@react-bulk/core';
import { ButtonProps } from '@react-bulk/core/src/types';

import map from '../../map';

type ButtonPropsNative = TouchableOpacityProps & ButtonProps;

const Button = forwardRef(({ ...props }: ButtonPropsNative, ref) => {
  return createButton(props, ref, map);
});

export default Button;
