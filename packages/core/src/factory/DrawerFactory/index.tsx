import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { DrawerProps } from '../../types';
import BackdropFactory from '../BackdropFactory';
import BoxFactory from '../BoxFactory';

const DrawerFactory = React.memo<DrawerProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Drawer;

    // Extends from default props
    let {
      placement,
      visible,
      onBackdropPress,
      // Styles
      variants,
      style,
      backdropStyle,
      ...rest
    } = factory2<DrawerProps>(props, options);

    style = [visible && { ml: 0, mr: 0, mt: 0, mb: 0 }, style];

    return (
      <BackdropFactory visible={visible} onPress={onBackdropPress} style={backdropStyle} stylist={[variants.backdrop]}>
        <BoxFactory ref={ref} {...rest} style={style} stylist={[variants.root, stylist]}>
          {children}
        </BoxFactory>
      </BackdropFactory>
    );
  }),
);

DrawerFactory.displayName = 'DrawerFactory';

export default DrawerFactory;
