import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { ModalProps } from '../../types';
import BackdropFactory from '../BackdropFactory';
import CardFactory from '../CardFactory';

const ModalFactory = React.memo<ModalProps>(
  forwardRef(({ children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Modal;

    // Extends from default props
    const {
      halign,
      valign,
      visible,
      onClose,
      onBackdropPress,
      // Styles
      variants,
      style,
      ...rest
    } = factory2<ModalProps>(props, options);

    return (
      <BackdropFactory visible={visible} variants={{ root: variants.backdrop }} onPress={onClose ?? onBackdropPress}>
        <CardFactory ref={ref} variants={{ root: variants.root }} {...rest}>
          {children}
        </CardFactory>
      </BackdropFactory>
    );
  }),
);

ModalFactory.displayName = 'ModalFactory';

export default ModalFactory;
