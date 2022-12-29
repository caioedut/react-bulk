import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { DividerProps } from '../../types';
import BoxFactory from '../BoxFactory';

const DividerFactory = React.memo<DividerProps>(
  forwardRef(({ stylist, ...props }, ref) => {
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

    return <BoxFactory ref={ref} style={style} stylist={[variants.root, stylist]} {...rest} />;
  }),
);

DividerFactory.displayName = 'DividerFactory';

export default DividerFactory;
