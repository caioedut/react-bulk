import React, { MutableRefObject, forwardRef, useEffect, useMemo } from 'react';

import useAnimation from '../hooks/useAnimation';
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

    const visibleStyle = useMemo(
      () => ({
        [placement]: '0%',
      }),
      [placement],
    );

    const hiddenStyle = useMemo(
      () => ({
        [placement]: '-50%',
      }),
      [placement],
    );

    const transition = useAnimation(hiddenStyle, ref as MutableRefObject<any>);

    useEffect(() => {
      transition.start({
        duration: 200,
        from: visible ? hiddenStyle : visibleStyle,
        to: visible ? visibleStyle : hiddenStyle,
      });
    }, [visible, placement, hiddenStyle, visibleStyle, transition.start]);

    return (
      <BackdropFactory visible={visible} onPress={onClose} style={backdropStyle} variants={{ root: variants.backdrop }}>
        <BoxFactory
          key={placement}
          {...rest}
          {...transition.props}
          style={[transition.props.style, style]}
          variants={{ root: variants.root }}
        >
          {children}
        </BoxFactory>
      </BackdropFactory>
    );
  }),
);

DrawerFactory.displayName = 'DrawerFactory';

export default DrawerFactory;
