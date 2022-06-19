import { forwardRef, useEffect, useState } from 'react';
import { Image as RNImage, ImageProps as RNImageProps } from 'react-native';

import { createImage } from '@react-bulk/core';
import { ImageProps } from '@react-bulk/core/src/types';

import map from '../map';

type ImagePropsNative = RNImageProps & ImageProps;

const Image = forwardRef(({ source, width, height, onLayout, style, ...props }: ImagePropsNative, ref) => {
  const { Box } = map;

  const [imgWidth, setImgWidth] = useState<number | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [finalWidth, setFinalWidth] = useState<number | null>(0);
  const [finalHeight, setFinalHeight] = useState<number | null>(0);

  const loading = [aspectRatio, containerWidth].some((item: any) => [undefined, null].includes(item));

  if (typeof source === 'string') {
    source = { uri: source };
  }

  useEffect(() => {
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

  const handleLayout = (e: any) => {
    setContainerWidth(e.nativeEvent.layout.width);
    onLayout?.(e);
  };

  const styleX: any = [style, width && { width }, height && { height }];

  // @ts-ignore
  props = { ...props, width: finalWidth, height: finalHeight, source };

  return (
    <Box onLayout={handleLayout} style={styleX}>
      {createImage(props, ref, map)}
    </Box>
  );
});

export default Image;
