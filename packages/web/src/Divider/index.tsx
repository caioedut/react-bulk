import { ComponentPropsWithRef, forwardRef } from 'react';

import DividerFactory from '@react-bulk/core/src/factory/DividerFactory';
import { DividerProps } from '@react-bulk/core/src/types';

import map from '../map';

export type DividerPropsWeb = ComponentPropsWithRef<'div'> & DividerProps;

function Divider({ ...props }: DividerPropsWeb, ref) {
  return <DividerFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Divider);
