import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import useDefaultRef from '../hooks/useDefaultRef';
import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import get from '../props/get';
import { ImageProps, RequiredSome } from '../types';
import defined from '../utils/defined';
import global from '../utils/global';
import BoxFactory from './BoxFactory';
import TextFactory from './TextFactory';

const ImageFactory = React.memo<ImageProps>(
  forwardRef(({ ref, ...props }, legacyRef) => {
    ref = ref || legacyRef;

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
    } = factory2<RequiredSome<ImageProps, 'mode'>>(props, options);

    const imageRef = useDefaultRef<any>(ref);

    const widthFound = width ?? w ?? get('width', style) ?? get('w', style);
    const heightFound = height ?? h ?? get('height', style) ?? get('h', style);

    // Defaults
    width = widthFound === true ? '100%' : widthFound;
    height = heightFound === true ? '100%' : heightFound;

    if (typeof width === 'string' && width.endsWith('px')) {
      width = Number(width.replace(/px$/g, ''));
    }

    if (typeof height === 'string' && height.endsWith('px')) {
      height = Number(height.replace(/px$/g, ''));
    }

    const [status, setStatus] = useState('loading');
    const [containerWidth, setContainerWidth] = useState<number>();
    const [containerHeight, setContainerHeight] = useState<number>();
    const [imgWidth, setImgWidth] = useState<number | null>(null);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    const [finalWidth, setFinalWidth] = useState<number | undefined>(typeof width === 'number' ? width : undefined);
    const [finalHeight, setFinalHeight] = useState<number | undefined>(typeof height === 'number' ? height : undefined);

    const isProcessed =
      [width, height].every((value) => typeof value === 'number') ||
      [finalWidth, finalHeight].every((value) => typeof value === 'number');

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
        // @ts-expect-error
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
      setContainerHeight(e.nativeEvent.layout.height);
      onLayout?.(e);
    };

    const handleLoad = (e: any) => {
      setStatus('ready');
      onLoad?.(e);
    };

    const handleError = useCallback(
      (e: any) => {
        setStatus('error');
        onError?.(e);
      },
      [onError],
    );

    useEffect(() => {
      setStatus('loading');
    }, [source]);

    useEffect(() => {
      if (isProcessed || !native || !source) return;

      // @ts-expect-error
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
    }, [source, width, height, isProcessed, Image, handleError, native]);

    useEffect(() => {
      if (isProcessed || !native || !defined(aspectRatio) || !defined(containerWidth) || !defined(containerHeight))
        return;

      let widthBase = typeof width === 'number' ? width : null;
      let heightBase = typeof height === 'number' ? height : null;

      const widthStr = `${width ?? ''}`.toLowerCase().trim();
      const heightStr = `${height ?? ''}`.toLowerCase().trim();

      if (widthBase === null) {
        if (widthStr.endsWith('px')) {
          widthBase = Number(widthStr.replace(/px$/g, ''));
        }

        if (widthStr.endsWith('%')) {
          const multiplier = Number(widthStr.replace(/%$/g, '')) / 100;
          widthBase = (containerWidth ?? 0) * multiplier;
        }
      }

      if (heightBase === null) {
        if (heightStr.endsWith('px')) {
          heightBase = Number(heightStr.replace(/px$/g, ''));
        }

        if (heightStr.endsWith('%')) {
          const multiplier = Number(heightStr.replace(/%$/g, '')) / 100;
          heightBase = (containerHeight ?? 0) * multiplier;
        }
      }

      if (widthBase === null && heightBase === null) {
        widthBase = containerWidth ?? imgWidth;
      }

      if (heightBase === null && widthBase !== null) {
        heightBase = widthBase * (aspectRatio || 0);
      }

      // TODO: NATIVE: fix CONTAINER WIDTH when have only height value
      if (widthBase === null && heightBase !== null) {
        widthBase = heightBase / (aspectRatio || 1);
      }

      const newWidth = Number(widthBase ?? 0);
      const newHeight = Number(heightBase ?? 0);

      setFinalWidth(newWidth);
      setFinalHeight(newHeight);
    }, [width, height, containerWidth, containerHeight, imgWidth, aspectRatio, isProcessed, native]);

    const borderRadius = finalWidth ?? finalHeight ?? height ?? width;

    style = [
      { overflow: 'hidden' },

      web && {
        objectFit: mode,
        height: height ?? undefined,
        width: width ?? undefined,
      },

      native && !isProcessed && { flex: 1 },

      native && {
        height: isProcessed ? finalHeight : undefined,
        width: isProcessed ? finalWidth : undefined,
      },

      circular && {
        web: { borderRadius: '50%' },
        native: { borderRadius: (typeof borderRadius === 'number' ? borderRadius : 0) / 2 },
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
        <BoxFactory style={style} variants={{ root: variants.root }} onLayout={!isProcessed ? handleLayout : undefined}>
          <BoxFactory ref={imageRef} component={Image} {...rest} noRootStyles />
        </BoxFactory>
      );
    }

    return (
      <BoxFactory
        ref={imageRef}
        component={Image}
        style={style}
        variants={{ root: variants.root }}
        {...rest}
        noRootStyles
      />
    );
  }),
);

ImageFactory.displayName = 'ImageFactory';

export default ImageFactory;
