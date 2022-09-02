import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, ModalProps } from '../../types';
import useStylist from '../../useStylist';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';

function ModalFactory({ stylist, children, map, ...props }: FactoryProps & ModalProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Modal;
  const { web, native } = map;

  // Extends from default props
  let { align, onBackdropPress, visible, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleVisible = useStylist({
    avoid: !web || !visible,
    name: 'rbk-modal-visible',
    style: {
      opacity: 1,
      visibility: 'visible',
      zIndex: theme.mixins.zIndex.modal,
    },
  });

  const styleState = useStylist({
    style: {
      alignItems: pick(align, 'center', {
        center: 'center',
        top: 'flex-start',
        bottom: 'flex-end',
      }),
    },
  });

  const containerProps: any = {};

  if (native) {
    containerProps.onStartShouldSetResponder = () => true;
    containerProps.onTouchEnd = (e) => e.stopPropagation();
  }

  stylist = [styleRoot, styleState, styleVisible, stylist];

  return (
    <BoxFactory map={map} ref={ref} stylist={stylist} {...rest} onPress={onBackdropPress}>
      <BoxFactory map={map} {...containerProps}>
        {children}
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(ModalFactory);
