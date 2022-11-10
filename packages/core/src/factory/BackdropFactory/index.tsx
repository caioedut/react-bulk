import React, { useEffect } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { BackdropProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';

function BackdropFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & BackdropProps) {
  const theme = useTheme();
  const options = theme.components.Backdrop;
  const { web, native, Button, Dialog } = map;

  // Extends from default props
  let {
    visible,
    onRequestClose,
    // Styles
    variants,
    ...rest
  } = factory2(props, options);

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
        <BoxFactory map={map} innerRef={innerRef} stylist={[variants.root, stylist]} {...rest} {...containerProps}>
          {children}
        </BoxFactory>
      </Dialog>
    );
  }

  return (
    <BoxFactory map={map} innerRef={innerRef} component={Dialog} stylist={[variants.root, stylist]} {...rest}>
      <BoxFactory map={map} maxh="100%" maxw="100%" {...containerProps}>
        {children}
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.memo(BackdropFactory);
