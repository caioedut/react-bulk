import { forwardRef, useRef } from 'react';

import { ModalFactory, ModalProps } from '@react-bulk/core';

import useMap from '../useMap';

function Modal({ onBackdropPress, ...props }: ModalProps, ref) {
  const map = useMap();

  const defaultRef = useRef(null);
  const backdropRef: any = ref || defaultRef;

  // @ts-ignore
  props.onBackdropPress = !onBackdropPress ? undefined : (e) => e.target === backdropRef.current && onBackdropPress(e);

  return <ModalFactory ref={ref} {...props} map={map} />;
}

export default forwardRef<typeof Modal, ModalProps>(Modal);
