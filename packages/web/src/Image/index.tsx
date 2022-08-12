import { forwardRef, useMemo } from 'react';

import { ImageFactory, ImageProps } from '@react-bulk/core';

import useMap from '../useMap';

function Image({ source, corners, rounded, style, ...props }: ImageProps, ref) {
  const map = useMap();

  style = [
    rounded && {
      borderRadius: '50%',
    },

    style,
  ];

  // @ts-ignore
  props.src = useMemo(() => source?.uri ?? source, [source]);

  return <ImageFactory ref={ref} {...props} map={map} style={style} />;
}

export default forwardRef<typeof Image, ImageProps>(Image);
