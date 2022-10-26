import React, { useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, ImageProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function ImageFactory({ stylist, map, innerRef, ...props }: FactoryProps & ImageProps) {
  const theme = useTheme();
  const options = theme.components.Image;
  const { web, Image } = map;

  // Extends from default props
  let { mode, height, width, ...rest } = factory(props, options.defaultProps);

  const defaultRef: any = useRef(null);
  const imageRef = innerRef || defaultRef;

  if (web) {
    rest.alt = rest.alt ?? '';
  }

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleState = useStylist({
    style: {
      height,
      width,
      web: { objectFit: mode },
      native: { resizeMode: mode === 'fill' ? 'stretch' : mode },
    },
  });

  stylist = [styleRoot, styleState, stylist];

  return <BoxFactory map={map} innerRef={imageRef} component={Image} stylist={stylist} {...rest} noRootStyles />;
}

export default React.memo(ImageFactory);
