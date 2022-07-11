import { forwardRef } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import TextFactory from '@react-bulk/core/src/factory/TextFactory';
import { TextProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type TextPropsNative = RNTextProps & TextProps;

function Text({ ...props }: TextPropsNative, ref) {
  const map = useMap();

  return <TextFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Text);
