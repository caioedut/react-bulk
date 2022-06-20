import { forwardRef, useRef } from 'react';

import { ModalProps, createModal } from '@react-bulk/core';

import map from '../map';

const Modal = forwardRef(({ onBackdropPress, ...props }: ModalProps, ref) => {
  const defaultRef = useRef(null);
  const backdropRef: any = ref || defaultRef;

  // @ts-ignore
  props.onBackdropPress = !onBackdropPress ? undefined : (e) => e.target === backdropRef.current && onBackdropPress(e);

  return createModal(props, backdropRef, map);
});

export default Modal;
