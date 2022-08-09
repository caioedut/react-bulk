import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { DividerFactory, DividerProps } from '@react-bulk/core';

import useMap from '../useMap';

export type DividerPropsWeb = ViewProps & DividerProps;

function Divider({ ...props }: DividerPropsWeb, ref) {
  return <DividerFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Divider);
