import React from 'react';

import { BoxFactory, FactoryProps, ModalProps, clsx, useTheme } from '@react-bulk/core';

function ModalFactory({ className, children, map, ...props }: FactoryProps & ModalProps, ref: any) {
  const theme = useTheme();
  const { web, native } = map;
  const classes: any[] = ['rbk-modal', className];

  // Extends from default props
  props = { ...theme.components.Modal.defaultProps, ...props };

  let { align, onBackdropPress, visible, style, ...rest } = props;

  style = [
    {
      position: web ? 'fixed' : 'relative',
      top: 0,
      left: 0,

      height: '100%',
      width: '100%',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    align === 'top' && { alignItems: 'flex-start' },

    align === 'bottom' && { alignItems: 'flex-end' },

    web && {
      transition: 'all 0.4s ease',
      opacity: 0,
      visibility: 'hidden',
      zIndex: -1,
    },

    web &&
      visible && {
        opacity: 1,
        visibility: 'visible',
        zIndex: theme.mixins.zIndex.modal,
      },

    style,
  ];

  const containerProps: any = {};

  if (native) {
    containerProps.onStartShouldSetResponder = () => true;
    containerProps.onTouchEnd = (e) => e.stopPropagation();
  }

  return (
    <BoxFactory map={map} ref={ref} flexbox {...rest} className={clsx(classes)} style={style} onPress={onBackdropPress}>
      <BoxFactory map={map} {...containerProps}>
        {children}
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(ModalFactory);
