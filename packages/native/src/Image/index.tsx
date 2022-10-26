import { forwardRef, memo, useEffect, useState } from 'react';
import { Image as RNImage } from 'react-native';

import { BoxFactory, ImageFactory, extract } from '@react-bulk/core';
import { customStyleProps, spacings } from '@react-bulk/core';

import { NativeImageProps } from '../types';
import useMap from '../useMap';

function Image({ source, width, height, w, h, corners, circular, onLayout, style, ...props }: NativeImageProps, ref) {
  const map = useMap();

  const [imgWidth, setImgWidth] = useState<number | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [finalWidth, setFinalWidth] = useState<number | null>(0);
  const [finalHeight, setFinalHeight] = useState<number | null>(0);

  const loading = [aspectRatio, containerWidth].some((item: any) => [undefined, null].includes(item));

  // Defaults
  width = width ?? w;
  height = height ?? h;

  if (typeof source === 'string') {
    source = { uri: source };
  }

  useEffect(() => {
    if (!source) return;

    if (typeof source === 'number') {
      const image = RNImage.resolveAssetSource(source as any);
      setImgWidth(image.width);
      setAspectRatio(image.height / (image.width || 1));
    } else {
      // @ts-ignore
      RNImage.getSize(source.uri, (width, height) => {
        setImgWidth(width);
        setAspectRatio(height / (width || 1));
      });
    }
  }, [source]);

  useEffect(() => {
    if (loading) return;

    let widthBase = typeof width === 'number' ? width : null;
    let heightBase = typeof height === 'number' ? height : null;

    let newWidth = (widthBase ?? Math.min(imgWidth ?? 0, containerWidth ?? 0)) as number;
    let newHeight = (heightBase ?? 0) as number;

    // Calc height
    if (!heightBase) {
      newHeight = newWidth * (aspectRatio ?? 0);
    }

    // Calc width
    if (!widthBase) {
      newWidth = newHeight / (aspectRatio ?? 1);
    }

    setFinalWidth(newWidth);
    setFinalHeight(newHeight);
  }, [loading, width, height, containerWidth, imgWidth, aspectRatio]);

  const containerProps = extract([...spacings, ...customStyleProps], props, style);

  style = [
    {
      corners: corners ?? 0,
      overflow: 'hidden',
    },

    circular && {
      borderRadius: ((finalWidth ?? finalHeight ?? height ?? width) as number) / 2,
    },

    style,

    width && { width },

    height && { height },
  ];

  const handleLayout = (e: any) => {
    setContainerWidth(e.nativeEvent.layout.width);
    onLayout?.(e);
  };

  // @ts-ignore
  props = { ...props, width: finalWidth, height: finalHeight, source };

  return (
    <BoxFactory {...containerProps} onLayout={handleLayout} style={style} map={map}>
      <ImageFactory innerRef={ref} {...props} map={map} />
    </BoxFactory>
  );
}

export default memo(forwardRef<typeof Image, NativeImageProps>(Image));
