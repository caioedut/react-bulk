import React, { forwardRef, useRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { BoxProps } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

// TODO
const ImageFactory = React.memo<BoxProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Image;
    const { web, native, Image } = global.mapping;

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
    const imageRef = ref || defaultRef;

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

    return <BoxFactory ref={imageRef} component={Image} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles />;
  }),
);

ImageFactory.displayName = 'ImageFactory';

export default ImageFactory;
