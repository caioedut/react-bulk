import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, ModalProps } from '../../types';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';

function ModalFactory({ className, children, map, ...props }: FactoryProps & ModalProps, ref: any) {
  const theme = useTheme();
  const { web, native } = map;

  // Extends from default props
  props = { ...theme.components.Modal.defaultProps, ...props };

  let { align, onBackdropPress, visible, ...rest } = props;

  const styleRoot = createStyle({
    className: 'rbk-modal',
    style: {
      position: web ? 'fixed' : 'relative',
      top: 0,
      left: 0,

      height: '100%',
      width: '100%',

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',

      web: {
        transition: `all ${theme.mixins.transition}`,
        opacity: 0,
        visibility: 'hidden',
        zIndex: -1,
      },
    },
  });

  const styleState = createStyle({
    style: {
      alignItems: pick(align, 'center', {
        center: 'center',
        top: 'flex-start',
        bottom: 'flex-end',
      }),
    },
  });

  const styleVisible = createStyle({
    className: 'rbk-modal-visible',
    style: web && {
      opacity: 1,
      visibility: 'visible',
      zIndex: theme.mixins.zIndex.modal,
    },
  });

  const containerProps: any = {};

  if (native) {
    containerProps.onStartShouldSetResponder = () => true;
    containerProps.onTouchEnd = (e) => e.stopPropagation();
  }

  const styles = [styleRoot, styleState, visible && styleVisible, className];

  return (
    <BoxFactory map={map} ref={ref} {...rest} className={styles} onPress={onBackdropPress}>
      <BoxFactory map={map} {...containerProps}>
        {children}
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(ModalFactory);
