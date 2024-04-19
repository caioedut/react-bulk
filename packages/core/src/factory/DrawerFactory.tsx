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
            from: visible ? { [placement]: '-50%' } : { [placement]: '0%' },
            to: visible ? { [placement]: '0%' } : { [placement]: '-50%' },
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
