import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { ModalProps } from '../../types';
import BackdropFactory from '../BackdropFactory';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

const ModalFactory = React.memo<ModalProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
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
    } = factory2<ModalProps>(props, options);

    return (
      <BackdropFactory ref={ref} stylist={[variants.root, stylist]} {...rest} onPress={onBackdropPress}>
        <BoxFactory maxh="100%" maxw="100%" p={theme.shape.gap}>
          <CardFactory maxh="100%" maxw="100%">
            {children}
          </CardFactory>
        </BoxFactory>
      </BackdropFactory>
    );
  }),
);

ModalFactory.displayName = 'ModalFactory';

export default ModalFactory;
