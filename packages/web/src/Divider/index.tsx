import { ComponentPropsWithRef, forwardRef } from 'react';

import { DividerFactory, DividerProps } from '@react-bulk/core';

import useMap from '../useMap';

export type DividerPropsWeb = ComponentPropsWithRef<'div'> & DividerProps;

function Divider({ ...props }: DividerPropsWeb, ref) {
  return <DividerFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Divider);
