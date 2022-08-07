import React, { useRef } from 'react';

import { ImageProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function ImageFactory({ width, height, mode, className, style, map, ...rest }: ImageProps | any, ref: any) {
  const { web, native, Image } = map;
  const classes: any[] = ['rbk-image', className];

  const defaultRef: any = useRef(null);
  const imageRef = ref || defaultRef;

  mode = mode ?? 'cover';

  style = [
    web && { display: 'inline-block', objectFit: mode },

    native && { resizeMode: mode === 'fill' ? 'stretch' : mode },

    style,

    { width, height },
  ];

  return <BoxFactory map={map} ref={imageRef} component={Image} {...rest} className={clsx(classes)} style={style} />;
}

export default React.forwardRef(ImageFactory);
