import { forwardRef } from 'react';
import { TextProps } from 'react-native';

import { LabelFactory, LabelProps } from '@react-bulk/core';

import useMap from '../useMap';

export type LabelPropsNative = TextProps & LabelProps;

function Label({ ...props }: LabelPropsNative, ref) {
  return <LabelFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Label);
