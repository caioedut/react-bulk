import { ComponentPropsWithRef, forwardRef } from 'react';

import { TextFactory, TextProps } from '@react-bulk/core';

import useMap from '../useMap';

export type TextPropsWeb = ComponentPropsWithRef<'span'> & TextProps;

function Text({ ...props }: TextPropsWeb, ref) {
  return <TextFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Text);
