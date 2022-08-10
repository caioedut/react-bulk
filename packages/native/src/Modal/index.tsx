import { forwardRef } from 'react';
import { Modal as RNModal, TouchableOpacity } from 'react-native';

import { ModalFactory, ModalProps } from '@react-bulk/core';

import useMap from '../useMap';

function Modal({ visible, onBackdropPress, ...props }: ModalProps, ref) {
  const map = useMap();

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
      visible={Boolean(visible)}
      animationType="fade"
      presentationStyle="overFullScreen"
    >
      <ModalFactory ref={ref} {...props} map={map} />
    </RNModal>
  );
}

export default forwardRef<typeof Modal, ModalProps>(Modal);
