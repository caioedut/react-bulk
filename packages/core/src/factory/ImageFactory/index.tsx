import React, { useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, ImageProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function ImageFactory({ className, map, ...props }: FactoryProps & ImageProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Image;
  const { Image } = map;

  // Extends from default props
  let { mode, height, width, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const defaultRef: any = useRef(null);
  const imageRef = ref || defaultRef;

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleState = useStylist({
    style: {
      height,
      width,
      web: { objectFit: mode },
      native: { resizeMode: mode === 'fill' ? 'stretch' : mode },
    },
  });

  const styles = [styleRoot, styleState, className];

  return <BoxFactory map={map} ref={imageRef} component={Image} {...rest} className={styles} />;
}

export default React.forwardRef(ImageFactory);
