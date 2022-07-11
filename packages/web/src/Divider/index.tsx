import { ComponentPropsWithRef, forwardRef } from 'react';

import DividerFactory from '@react-bulk/core/src/factory/DividerFactory';
import { DividerProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type DividerPropsWeb = ComponentPropsWithRef<'div'> & DividerProps;

function Divider({ ...props }: DividerPropsWeb, ref) {
  const map = useMap();

  return <DividerFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Divider);
