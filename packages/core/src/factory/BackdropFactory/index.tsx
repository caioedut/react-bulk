import React, { useEffect } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { BackdropProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function BackdropFactory({ stylist, children, map, ...props }: FactoryProps & BackdropProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Backdrop;
  const { web, native, Button } = map;

  // Extends from default props
  let { visible, ...rest } = factory(props, options.defaultProps);

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

    if (!visible) {
      window.onscroll = null;
    }

    if (visible) {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      const left = window.pageXOffset || document.documentElement.scrollLeft;

      // @ts-ignore
      window.onscroll = () => window.scrollBy({ top, left, behavior: 'instant' });
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

  return (
    <BoxFactory map={map} ref={ref} stylist={[styleRoot, styleVisible, stylist]} {...rest}>
      <BoxFactory map={map} {...containerProps}>
        {children}
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(BackdropFactory);
