import React, { forwardRef, useEffect, useRef, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import get from '../../props/get';
import { ImageProps } from '../../types';
import defined from '../../utils/defined';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

const ImageFactory = React.memo<ImageProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Image;
    const { web, native, Image } = global.mapping;

    // Extends from default props
    let {
      alt,
      circular,
      fallback,
      mode,
      source,
      // Sizes
      width,
      height,
      w,
      h,
      // Events
      onLayout,
      onLoad,
      onError,
      // Styles
      variants,
      style,
      ...rest
    } = factory2(props, options);

    const defaultRef: any = useRef(null);
    const imageRef = ref || defaultRef;

    // Defaults
    width = width ?? w ?? get('width', style) ?? get('w', style);
    height = height ?? h ?? get('height', style) ?? get('h', style);

    const isProcessed = defined(w) && defined(h);

    const [status, setStatus] = useState('loading');

    const [containerWidth, setContainerWidth] = useState<number>();
    const [imgWidth, setImgWidth] = useState<number | null>(null);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    const [finalWidth, setFinalWidth] = useState<number | null>(width ?? 0);
    const [finalHeight, setFinalHeight] = useState<number | null>(height ?? 0);

    if (alt) {
      rest.accessibility = rest.accessibility || {};
      rest.accessibility.label = rest.accessibility.label ?? alt;
    }

    Object.assign(rest, {
      onLoad: (e) => handleLoad(e),
      onError: (err) => handleError(err),
    });

    if (web) {
      Object.assign(rest, {
        alt: alt ?? '',
        src: source?.uri ?? source,
      });
    }

    if (native) {
      Object.assign(rest, {
        source: typeof source === 'string' ? { uri: source } : source,
        resizeMode: mode === 'fill' ? 'stretch' : mode,
        width: finalWidth,
        height: finalHeight,
      });
    }

    const handleLayout = (e: any) => {
      setContainerWidth(e.nativeEvent.layout.width);
      onLayout?.(e);
    };

    const handleLoad = (e: any) => {
      setStatus('ready');
      onLoad?.(e);
    };

    const handleError = (e: any) => {
      setStatus('error');
      onError?.(e);
    };

    useEffect(() => {
      setStatus('loading');
    }, [source]);

    useEffect(() => {
      if (isProcessed || !native || !source) return;

      const asset = source?.uri ?? source;

      try {
        if (typeof asset === 'number') {
          const image = Image.resolveAssetSource(asset as any);
          setImgWidth(image.width);
          setAspectRatio(image.height / (image.width || 1));
        } else {
          Image.getSize(
            asset,
            (width, height) => {
              setImgWidth(width);
              setAspectRatio(height / (width || 1));
            },
            (err) => handleError(err),
          );
        }
      } catch (err) {
        handleError(err);
      }
    }, [source, width, height, isProcessed]);

    useEffect(() => {
      if (isProcessed || !native || !defined(aspectRatio) || !defined(containerWidth)) return;

      let widthBase = typeof width === 'number' ? width : null;
      let heightBase = typeof height === 'number' ? height : null;

      const widthStr = `${width}`.toLowerCase().trim();
      const heightStr = `${height}`.toLowerCase().trim();

      if (widthStr.endsWith('px')) {
        widthBase = Number(widthStr.replace(/\D/g, ''));
      }

      if (heightStr.endsWith('px')) {
        heightBase = Number(heightStr.replace(/\D/g, ''));
      }

      if (widthBase === null && widthStr.endsWith('%')) {
        const multiplier = Number(widthStr.replace(/\D/g, '')) / 100;
        widthBase = (containerWidth ?? 0) * multiplier;
      }

      let newWidth = Number(widthBase ?? imgWidth ?? 0);
      let newHeight = Number(heightBase ?? 0);

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
    }, [width, height, containerWidth, imgWidth, aspectRatio, isProcessed]);

    style = [
      { overflow: 'hidden' },

      height && { height },

      width && { width },

      web && { objectFit: mode },

      circular && {
        web: { borderRadius: '50%' },
        native: { borderRadius: ((finalWidth ?? finalHeight ?? height ?? width) as number) / 2 },
      },

      style,
    ];

    if (status === 'error') {
      if (defined(fallback)) {
        return typeof fallback === 'function' ? fallback() : fallback;
      }

      return defined(alt) ? <TextFactory>{alt}</TextFactory> : null;
    }

    if (native) {
      return (
        <BoxFactory style={style} stylist={[variants.root, stylist]} onLayout={!isProcessed ? handleLayout : undefined}>
          <BoxFactory ref={imageRef} component={Image} {...rest} noRootStyles />
        </BoxFactory>
      );
    }

    return <BoxFactory ref={imageRef} component={Image} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles />;
  }),
);

ImageFactory.displayName = 'ImageFactory';

export default ImageFactory;
