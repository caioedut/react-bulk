import { ComponentPropsWithRef, forwardRef, useRef } from 'react';

import { ModalProps } from '@react-bulk/core';
import ModalFactory from '@react-bulk/core/src/factory/ModalFactory';

import map from '../map';

export type ModalPropsWeb = ComponentPropsWithRef<'div'> & ModalProps;

function Modal({ onBackdropPress, ...props }: ModalPropsWeb, ref) {
  const defaultRef = useRef(null);
  const backdropRef: any = ref || defaultRef;

  // @ts-ignore
  props.onBackdropPress = !onBackdropPress ? undefined : (e) => e.target === backdropRef.current && onBackdropPress(e);

  return <ModalFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Modal);
