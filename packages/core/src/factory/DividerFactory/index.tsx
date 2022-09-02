import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { DividerProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function DividerFactory({ stylist, map, ...props }: FactoryProps & DividerProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Divider;

  // Extends from default props
  let { color, opacity, size, vertical, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleState = useStylist({
    style: {
      backgroundColor: color,
      height: vertical ? '100%' : size,
      width: vertical ? size : '100%',
      opacity,
    },
  });

  stylist = [styleRoot, styleState, stylist];

  return <BoxFactory map={map} ref={ref} stylist={stylist} {...rest} />;
}

export default React.forwardRef(DividerFactory);
