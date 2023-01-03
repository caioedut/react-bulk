import React, { forwardRef, useEffect, useRef, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import get from '../../props/get';
import { ImageProps } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const ImageFactory = React.memo<ImageProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Image;
    const { web, native, Image } = global.mapping;

    // Extends from default props
    let {
      alt,
      circular,
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

    alt = alt ?? '';

    const [status, setStatus] = useState('loading');

    const [imgWidth, setImgWidth] = useState<number | null>(null);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const [finalWidth, setFinalWidth] = useState<number | null>(0);
    const [finalHeight, setFinalHeight] = useState<number | null>(0);

    const loading = [aspectRatio, containerWidth].some((item: any) => [undefined, null].includes(item));

    if (alt) {
      rest.accessibility = rest.accessibility || {};
      rest.accessibility.label = rest.accessibility.label ?? alt;
    }

    // Defaults
    width = width ?? w ?? get('width', style) ?? get('w', style);
    height = height ?? h ?? get('height', style) ?? get('h', style);

    let imgProps = {};

    Object.assign(rest, {
      onLoad: (e) => handleLoad(e),
      onError: (err) => handleError(err),
    });

    if (web) {
      Object.assign(rest, {
        alt,
        src: source?.uri ?? source,
      });
    }

    if (native) {
      source = typeof source === 'string' ? { uri: source } : source;

      Object.assign(rest, {
        width: finalWidth,
        height: finalHeight,
        resizeMode: mode === 'fill' ? 'stretch' : mode,
      });

      Object.assign(imgProps, {
        source,
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
      if (!native || !source) return;

      try {
        if (typeof source === 'number') {
          const image = Image.resolveAssetSource(source as any);
          setImgWidth(image.width);
          setAspectRatio(image.height / (image.width || 1));
        } else {
          Image.getSize(
            source?.uri,
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
    }, [source, width, height]);

    useEffect(() => {
      if (!native || loading) return;

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
      return null;
    }

    if (native) {
      return (
        <BoxFactory style={style} stylist={[variants.root, stylist]} {...rest} onLayout={handleLayout}>
          <BoxFactory ref={imageRef} component={Image} {...imgProps} noRootStyles />
        </BoxFactory>
      );
    }

    return <BoxFactory ref={imageRef} component={Image} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles />;
  }),
);

ImageFactory.displayName = 'ImageFactory';

export default ImageFactory;
