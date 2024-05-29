import React, { forwardRef } from 'react';

import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { DrawerProps, RequiredSome } from '../types';
import BackdropFactory from './BackdropFactory';
import BoxFactory from './BoxFactory';

const DrawerFactory = React.memo<DrawerProps>(
  forwardRef(({ children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Drawer;

    // Extends from default props
    const {
      placement,
      visible,
      onClose,
      // Styles
      variants,
      style,
      backdropStyle,
      ...rest
    } = factory2<RequiredSome<DrawerProps, 'placement'>>(props, options);

    const hiddenStyle = {
      [placement]: '-50%',
    };

    const visibleStyle = {
      [placement]: '0%',
    };

    return (
      <BackdropFactory visible={visible} onPress={onClose} style={backdropStyle} variants={{ root: variants.backdrop }}>
        <BoxFactory
          ref={ref}
          key={placement}
          {...rest}
          style={style}
          variants={{ root: variants.root }}
          animation={{
            duration: 200,
            from: visible ? hiddenStyle : visibleStyle,
            to: visible ? visibleStyle : hiddenStyle,
          }}
        >
          {children}
        </BoxFactory>
      </BackdropFactory>
    );
  }),
);

DrawerFactory.displayName = 'DrawerFactory';

export default DrawerFactory;
