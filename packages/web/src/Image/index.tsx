import { ComponentPropsWithRef, forwardRef, useMemo } from 'react';

import ImageFactory from '@react-bulk/core/src/factory/ImageFactory';
import { ImageProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type ImagePropsWeb = ComponentPropsWithRef<'img'> & ImageProps;

function Image({ source, ...props }: ImagePropsWeb, ref) {
  const map = useMap();

  // @ts-ignore
  props.src = useMemo(() => source?.uri ?? source, [source]);

  return <ImageFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Image);
