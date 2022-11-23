import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { DividerProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';

function DividerFactory({ stylist, map, innerRef, ...props }: FactoryProps & DividerProps) {
  const theme = useTheme();
  const options = theme.components.Divider;

  // Extends from default props
  let {
    color,
    opacity,
    size,
    vertical,
    // Styles,
    variants,
    style,
    ...rest
  } = factory2(props, options);

  style = [
    {
      backgroundColor: color,
      opacity,
    },

    vertical && { width: size },

    !vertical && { height: size },

    style,
  ];

  return <BoxFactory map={map} innerRef={innerRef} style={style} stylist={[variants.root, stylist]} {...rest} />;
}

export default React.memo(DividerFactory);
