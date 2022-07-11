import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { DividerFactory } from '@react-bulk/core';
import { DividerProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type DividerPropsWeb = ViewProps & DividerProps;

function Divider({ ...props }: DividerPropsWeb, ref) {
  const map = useMap();

  return <DividerFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Divider);
