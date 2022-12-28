import React, { useRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FactoryProps, ImageProps } from '../../types';
import BoxFactory from '../BoxFactory';

function ImageFactory({ stylist, map, innerRef, ...props }: FactoryProps & ImageProps) {
  const theme = useTheme();
  const options = theme.components.Image;
  const { web, native, Image } = map;

  // Extends from default props
  let {
    alt,
    mode,
    height,
    width,
    // Styles
    variants,
    style,
    ...rest
  } = factory2(props, options);

  const defaultRef: any = useRef(null);
  const imageRef = innerRef || defaultRef;

  alt = alt ?? '';

  if (alt) {
    rest.accessibility = rest.accessibility || {};
    rest.accessibility.label = rest.accessibility.label ?? alt;
  }

  if (web) {
    rest.alt = alt;
  }

  style = [
    {
      height,
      width,
    },

    web && { objectFit: mode },

    native && { resizeMode: mode === 'fill' ? 'stretch' : mode },

    style,
  ];

  return (
    <BoxFactory map={map} innerRef={imageRef} component={Image} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles />
  );
}

const Memoized = React.memo(ImageFactory);
Memoized.displayName = 'ImageFactory';

export default Memoized;
