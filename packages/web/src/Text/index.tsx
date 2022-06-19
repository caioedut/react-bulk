import { ComponentPropsWithRef, forwardRef } from 'react';

import { createText } from '@react-bulk/core';
import { TextProps } from '@react-bulk/core/src/types';

import map from '../../map';

type TextPropsWeb = ComponentPropsWithRef<'span'> & TextProps;

const Text = forwardRef(({ ...props }: TextPropsWeb, ref) => {
  return createText(props, ref, map);
});

export default Text;
