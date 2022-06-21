import { forwardRef } from 'react';
import { Modal as RNModal, TouchableOpacity } from 'react-native';

import { ModalProps, createModal } from '@react-bulk/core';

import map from '../map';

const Modal = forwardRef(({ visible, onBackdropPress, ...props }: ModalProps, ref) => {
  if (onBackdropPress) {
    // @ts-ignore
    props.onBackdropPress = onBackdropPress;

    if (!props.component) {
      // @ts-ignore
      props.activeOpacity = 1;
      props.component = TouchableOpacity;
    }
  }

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
