import React from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import { ModalProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function ModalFactory({ visible, align, onBackdropPress, children, className, style, map, ...rest }: ModalProps | any, ref: any) {
  const { web, native } = Platform;
  const theme = useTheme();

  style = [
    {
      position: web ? 'fixed' : 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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
    <BoxFactory map={map} ref={ref} flexbox {...rest} className={clsx('rbk-modal', className)} style={style} onPress={onBackdropPress}>
      <BoxFactory map={map} {...containerProps}>
        {children}
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(ModalFactory);
