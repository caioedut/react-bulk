import React, { useRef } from 'react';

import { ImageProps } from '../../../typings';
import Platform from '../../Platform';
import BoxFactory from '../BoxFactory';

function ImageFactory({ width, height, mode = 'cover', style, map, ...rest }: ImageProps | any, ref: any) {
  const { web, native } = Platform;
  const { Image } = map;

  const defaultRef: any = useRef(null);
  const imageRef = ref || defaultRef;

  style = [
    web && { display: 'block', objectFit: mode },

    native && { resizeMode: mode === 'fill' ? 'stretch' : mode },

    style,

    { width, height },
  ];

  return <BoxFactory map={map} ref={imageRef} component={Image} {...rest} style={style} />;
}

export default React.forwardRef(ImageFactory);
