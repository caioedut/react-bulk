import React, { useRef } from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import { ImageProps } from '../../types';
import BoxFactory from '../BoxFactory';

function ImageFactory({ width, height, mode, corners, rounded, style, map, ...rest }: ImageProps | any, ref: any) {
  const theme = useTheme();
  const { web, native } = Platform;
  const { Image } = map;

  const defaultRef: any = useRef(null);
  const imageRef = ref || defaultRef;

  mode = mode ?? 'cover';

  style = [
    web && { display: 'block', objectFit: mode },

    native && { resizeMode: mode === 'fill' ? 'stretch' : mode },

    corners && {
      borderRadius: corners * theme.shape.borderRadius,
    },

    rounded && {
      borderRadius: Math.min(height, width) / 2,
    },

    style,

    { width, height },
  ];

  return <BoxFactory map={map} ref={imageRef} component={Image} {...rest} style={style} />;
}

export default React.forwardRef(ImageFactory);
