import { ComponentPropsWithRef, forwardRef } from 'react';

import TextFactory from '@react-bulk/core/src/factory/TextFactory';
import { TextProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type TextPropsWeb = ComponentPropsWithRef<'span'> & TextProps;

function Text({ ...props }: TextPropsWeb, ref) {
  const map = useMap();

  return <TextFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Text);
