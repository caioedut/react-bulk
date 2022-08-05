import { forwardRef } from 'react';
import { TextProps } from 'react-native';

import { LabelFactory } from '@react-bulk/core';
import { LabelProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type LabelPropsNative = TextProps & LabelProps;

function Label({ ...props }: LabelPropsNative, ref) {
  const map = useMap();

  return <LabelFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Label);
