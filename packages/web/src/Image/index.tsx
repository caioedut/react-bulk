import { ComponentPropsWithRef, forwardRef, useMemo } from 'react';

import { createImage } from '@react-bulk/core';
import { ImageProps } from '@react-bulk/core/src/types';

import map from '../../map';

type ImagePropsWeb = ComponentPropsWithRef<'img'> & ImageProps;

const Image = forwardRef(({ source, ...props }: ImagePropsWeb, ref) => {
  // @ts-ignore
  props.src = useMemo(() => source?.uri ?? source, [source]);

  return createImage(props, ref, map);
});

export default Image;
