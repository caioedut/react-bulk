import { forwardRef } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import TextFactory from '@react-bulk/core/src/factory/TextFactory';
import { TextProps } from '@react-bulk/core/src/types';

import map from '../map';

export type TextPropsNative = RNTextProps & TextProps;

function Text({ ...props }: TextPropsNative, ref) {
  return <TextFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Text);
