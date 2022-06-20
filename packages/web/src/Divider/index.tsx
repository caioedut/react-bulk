import { ComponentPropsWithRef, forwardRef } from 'react';

import { createDivider } from '@react-bulk/core';
import { DividerProps } from '@react-bulk/core/src/types';

import map from '../map';

type DividerPropsWeb = ComponentPropsWithRef<'div'> & DividerProps;

const Divider = forwardRef(({ ...props }: DividerPropsWeb, ref) => {
  return createDivider(props, ref, map);
});

export default Divider;
