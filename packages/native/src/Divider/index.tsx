import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { createDivider } from '@react-bulk/core';
import { DividerProps } from '@react-bulk/core/src/types';

import map from '../map';

type DividerPropsWeb = ViewProps & DividerProps;

const Divider = forwardRef(({ ...props }: DividerPropsWeb, ref) => {
  return createDivider(props, ref, map);
});

export default Divider;
