import { ComponentPropsWithRef, forwardRef } from 'react';

import TextFactory from '@react-bulk/core/src/factory/TextFactory';
import { TextProps } from '@react-bulk/core/src/types';

import map from '../map';

export type TextPropsWeb = ComponentPropsWithRef<'span'> & TextProps;

function Text({ ...props }: TextPropsWeb, ref) {
  return <TextFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Text);
