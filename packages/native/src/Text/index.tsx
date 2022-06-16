import React, { forwardRef } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import { createText } from '@react-bulk/core';
import { TextProps } from '@react-bulk/core/types';

import map from '../../map';

type TextPropsNative = RNTextProps & TextProps;

const Text = forwardRef(({ ...props }: TextPropsNative, ref) => {
  return createText(props, ref, map);
});

export default Text;
