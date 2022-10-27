import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FactoryProps, ModalProps } from '../../types';
import BackdropFactory from '../BackdropFactory';

function ModalFactory({ stylist, map, innerRef, ...props }: FactoryProps & ModalProps) {
  const theme = useTheme();
  const options = theme.components.Modal;

  // Extends from default props
  let {
    halign,
    valign,
    onBackdropPress,
    // Styles
    variants,
    ...rest
  } = factory2(props, options);

  return <BackdropFactory map={map} innerRef={innerRef} stylist={[variants.root, stylist]} {...rest} onPress={onBackdropPress} />;
}

export default React.memo(ModalFactory);
