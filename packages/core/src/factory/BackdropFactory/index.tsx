import React, { useEffect } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { BackdropProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function BackdropFactory({ stylist, children, map, ...props }: FactoryProps & BackdropProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Backdrop;
  const { web, native, Button, Dialog } = map;

  // Extends from default props
  let { visible, onRequestClose, ...rest } = factory(props, options.defaultProps);

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

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleVisible = useStylist({
    avoid: !visible,
    name: options.name + '-visible',
    style: options.defaultStyles.visible,
  });

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
        <BoxFactory map={map} ref={ref} stylist={[styleRoot, styleVisible, stylist]} {...rest} {...containerProps}>
          {children}
        </BoxFactory>
      </Dialog>
    );
  }

  return (
    <BoxFactory map={map} ref={ref} component={Dialog} stylist={[styleRoot, styleVisible, stylist]} {...rest}>
      <BoxFactory map={map} {...containerProps}>
        {children}
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(BackdropFactory);
