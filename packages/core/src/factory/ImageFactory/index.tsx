import React, { useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, ImageProps } from '../../types';
import BoxFactory from '../BoxFactory';

function ImageFactory({ className, map, ...props }: FactoryProps & ImageProps, ref: any) {
  const theme = useTheme();
  const { web, Image } = map;

  // Extends from default props
  props = { ...theme.components.Image.defaultProps, ...props };

  let { mode, height, width, ...rest } = props;

  const defaultRef: any = useRef(null);
  const imageRef = ref || defaultRef;

  const styleRoot = createStyle({
    name: 'rbk-image',
    type: 'component',
    style: web && { display: 'inline-block' },
  });

  const styleState = createStyle({
    type: 'component',
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
