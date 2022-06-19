import { useRef } from 'react';

import Platform from './Platform';
import { ImageProps } from './types';

export default function createImage({ width, height, mode = 'cover', style, ...rest }: ImageProps | any, ref: any, map: any) {
  const { web, native } = Platform;
  const { Box, Image } = map;

  const defaultRef: any = useRef(null);
  const imageRef = ref || defaultRef;

  style = [
    web && { display: 'block', objectFit: mode },

    native && { resizeMode: mode === 'fill' ? 'stretch' : mode },

    style,

    { width, height },
  ];

  return <Box component={Image} {...rest} ref={imageRef} style={style} />;
}
