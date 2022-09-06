import { forwardRef } from 'react';

import { BackdropFactory, ModalProps, pick } from '@react-bulk/core';

import useMap from '../useMap';

function Modal({ halign, valign, onBackdropPress, style, ...props }: ModalProps, ref) {
  const alignItems = pick(valign as string, 'center', {
    center: 'center',
    top: 'flex-start',
    bottom: 'flex-end',
  });

  const justifyContent = pick(halign as string, 'center', {
    center: 'center',
    left: 'flex-start',
    right: 'flex-end',
  });

  return (
    <BackdropFactory
      ref={ref}
      {...props}
      map={useMap()}
      onPress={onBackdropPress}
      style={[style, { flexDirection: 'row', alignItems, justifyContent }]}
    />
  );
}

export default forwardRef<typeof Modal, ModalProps>(Modal);
