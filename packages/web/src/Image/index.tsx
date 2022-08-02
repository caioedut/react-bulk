import { ComponentPropsWithRef, forwardRef, useMemo } from 'react';

import { ImageFactory, useTheme } from '@react-bulk/core';
import { ImageProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type ImagePropsWeb = ComponentPropsWithRef<'img'> & ImageProps;

function Image({ source, corners, rounded, style, ...props }: ImagePropsWeb, ref) {
  const map = useMap();
  const theme = useTheme();

  style = [
    corners && {
      borderRadius: corners * theme.shape.borderRadius,
    },

    rounded && {
      borderRadius: '50%',
    },

    style,
  ];

  // @ts-ignore
  props.src = useMemo(() => source?.uri ?? source, [source]);

  return <ImageFactory ref={ref} {...props} map={map} style={style} />;
}

export default forwardRef(Image);
