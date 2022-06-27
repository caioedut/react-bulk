import { forwardRef } from 'react';
import { Modal as RNModal, TouchableOpacity, ViewProps } from 'react-native';

import { ModalProps } from '@react-bulk/core';
import ModalFactory from '@react-bulk/core/src/factory/ModalFactory';

import map from '../map';

export type ModalPropsNative = ViewProps & ModalProps;

function Modal({ visible, onBackdropPress, ...props }: ModalPropsNative, ref) {
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

export default forwardRef(Modal);
