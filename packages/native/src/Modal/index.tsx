import { forwardRef } from 'react';
import { Modal as RNModal } from 'react-native';

import { ModalProps, createModal } from '@react-bulk/core';

import map from '../map';

const Modal = forwardRef(({ visible, ...props }: ModalProps, ref) => {
  return (
    <RNModal //
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
    >
      {createModal(props, ref, map)}
    </RNModal>
  );
});

export default Modal;
