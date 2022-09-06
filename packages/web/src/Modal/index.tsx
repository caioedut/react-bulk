import { forwardRef } from 'react';

import { ModalFactory, ModalProps } from '@react-bulk/core';

import useMap from '../useMap';

function Modal({ ...props }: ModalProps, ref) {
  return <ModalFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Modal, ModalProps>(Modal);
