import React, { forwardRef, useEffect, useState } from 'react';
import { Image as RNImage } from 'react-native';

import { BoxFactory, ImageFactory, customStyleProps, extract, spacings } from '@react-bulk/core';

import { NativeImageProps } from '../types';

const Image = React.memo<NativeImageProps>(
  forwardRef(({ source, width, height, w, h, corners, circular, onLayout, style, ...props }, ref) => {
    const [error, setError] = useState(false);
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

      setError(false);

      try {
        if (typeof source === 'number') {
          const image = RNImage.resolveAssetSource(source as any);
          setImgWidth(image.width);
          setAspectRatio(image.height / (image.width || 1));
        } else {
          RNImage.getSize(
            // @ts-ignore
            source.uri,
            (width, height) => {
              setImgWidth(width);
              setAspectRatio(height / (width || 1));
            },
            () => {
              setError(true);
            },
          );
        }
      } catch (err) {
        setError(true);
      }
    }, [source, width, height]);

    useEffect(() => {
      if (loading) return;

      let widthBase = typeof width === 'number' ? width : null;
      let heightBase = typeof height === 'number' ? height : null;

      let newWidth = (widthBase ?? Math.min(imgWidth ?? 0, containerWidth ?? 0)) as number;
      let newHeight = (heightBase ?? 0) as number;

      // Calc height
      if (!heightBase) {
        newHeight = newWidth * (aspectRatio || 0);
      }

      // Calc width
      if (!widthBase) {
        newWidth = newHeight / (aspectRatio || 1);
      }

      setFinalWidth(newWidth);
      setFinalHeight(newHeight);
    }, [loading, width, height, containerWidth, imgWidth, aspectRatio]);

    const containerProps = extract([...spacings, ...customStyleProps], props, style);

    style = [
      { overflow: 'hidden' },

      style,

      corners && { corners },

      circular && {
        borderRadius: ((finalWidth ?? finalHeight ?? height ?? width) as number) / 2,
      },

      width && { width },

      height && { height },
    ];

    const handleLayout = (e: any) => {
      setContainerWidth(e.nativeEvent.layout.width);
      onLayout?.(e);
    };

    // @ts-ignore
    props = { ...props, width: finalWidth, height: finalHeight, source };

    if (error) {
      return null;
    }

    return (
      <BoxFactory {...containerProps} onLayout={handleLayout} style={style}>
        <ImageFactory ref={ref} {...props} />
      </BoxFactory>
    );
  }),
);

Image.displayName = 'Image';

export default Image;
