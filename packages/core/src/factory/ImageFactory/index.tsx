import React, { useRef } from 'react';

import Platform from '../../Platform';
import { ImageProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function ImageFactory({ width, height, mode, className, style, map, ...rest }: ImageProps | any, ref: any) {
  const { web, native } = Platform;
  const { Image } = map;

  const defaultRef: any = useRef(null);
  const imageRef = ref || defaultRef;

  mode = mode ?? 'cover';

  style = [
    web && { display: 'inline-block', objectFit: mode },

    native && { resizeMode: mode === 'fill' ? 'stretch' : mode },

    style,

    { width, height },
  ];

  return <BoxFactory map={map} ref={imageRef} component={Image} {...rest} className={clsx('rbk-collapse', className)} style={style} />;
}

export default React.forwardRef(ImageFactory);
