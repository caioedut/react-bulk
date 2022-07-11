import { ComponentPropsWithRef, forwardRef } from 'react';

import { BoxFactory } from '@react-bulk/core';
import { BoxProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type BoxPropsWeb = ComponentPropsWithRef<'div'> & BoxProps;

function Box({ ...props }: BoxPropsWeb, ref) {
  const map = useMap();

  return <BoxFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Box);
