import { forwardRef } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import { TextFactory, TextProps } from '@react-bulk/core';

import useMap from '../useMap';

export type TextPropsNative = RNTextProps & TextProps;

function Text({ ...props }: TextPropsNative, ref) {
  return <TextFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Text);
