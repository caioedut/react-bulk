import React, { forwardRef, useEffect, useRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { BackdropProps } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const BackdropFactory = React.memo<BackdropProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Backdrop;
    const { web, native, Button, Dialog } = global.mapping;

    // Extends from default props
    let {
      visible,
      onRequestClose,
      // Styles
      variants,
      ...rest
    } = factory2(props, options);

    const defaultRef = useRef(null);
    ref = ref || defaultRef;

    const containerProps: any = {};

    if (web) {
      containerProps.onPress = (e) => e.stopPropagation();
    }

    if (native) {
      containerProps.onStartShouldSetResponder = () => true;
      containerProps.onTouchEnd = (e) => e.stopPropagation();

      if (!rest.component) {
        rest.component = Button;
        rest.activeOpacity = 1;
      }
    }

    useEffect(() => {
      if (!web) return;

      if (visible) {
        // @ts-ignore
        setTimeout(() => ref?.current?.focus?.(), 10);

        const top = document.documentElement.scrollTop;
        const left = document.documentElement.scrollLeft;

        window.onscroll = () => window.scrollTo({ top, left, behavior: 'auto' });
      }

      return () => {
        window.onscroll = null;
      };
    }, [visible]);

    if (native) {
      return (
        <Dialog
          transparent
          statusBarTranslucent
          visible={Boolean(visible)}
          animationType="fade"
          presentationStyle="overFullScreen"
          onRequestClose={onRequestClose}
        >
          <BoxFactory ref={ref} stylist={[variants.root, stylist]} {...rest} {...containerProps}>
            {children}
          </BoxFactory>
        </Dialog>
      );
    }

    return (
      <BoxFactory ref={ref} component={Dialog} tabIndex="-1" stylist={[variants.root, stylist]} {...rest}>
        <BoxFactory maxh="100%" maxw="100%" style={{ cursor: 'auto' }} {...containerProps}>
          {children}
        </BoxFactory>
      </BoxFactory>
    );
  }),
);

BackdropFactory.displayName = 'BackdropFactory';

export default BackdropFactory;
