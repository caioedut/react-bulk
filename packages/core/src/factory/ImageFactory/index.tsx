import React, { useRef } from 'react';

import { BoxFactory, FactoryProps, ImageProps, clsx, useTheme } from '@react-bulk/core';

function ImageFactory({ className, map, ...props }: FactoryProps & ImageProps, ref: any) {
  const theme = useTheme();
  const { web, native, Image } = map;
  const classes: any[] = ['rbk-image', className];

  // Extends from default props
  props = { ...theme.components.Image.defaultProps, ...props };

  let { mode, height, width, style, ...rest } = props;

  const defaultRef: any = useRef(null);
  const imageRef = ref || defaultRef;

  style = [
    web && { display: 'inline-block', objectFit: mode },

    native && { resizeMode: mode === 'fill' ? 'stretch' : mode },

    style,

    { width, height },
  ];

  return <BoxFactory map={map} ref={imageRef} component={Image} {...rest} className={clsx(classes)} style={style} />;
}

export default React.forwardRef(ImageFactory);
