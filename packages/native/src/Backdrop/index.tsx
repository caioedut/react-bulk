import { forwardRef } from 'react';
import { Modal } from 'react-native';

import { BackdropFactory, BackdropProps } from '@react-bulk/core';

import useMap from '../useMap';

function Backdrop({ visible, ...props }: BackdropProps, ref) {
  return (
    <Modal //
      transparent
      statusBarTranslucent
      visible={Boolean(visible)}
      animationType="fade"
      presentationStyle="overFullScreen"
    >
      <BackdropFactory ref={ref} {...props} map={useMap()} />
    </Modal>
  );
}

export default forwardRef<typeof Backdrop, BackdropProps>(Backdrop);
