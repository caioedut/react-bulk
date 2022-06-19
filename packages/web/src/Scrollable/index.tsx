import { ComponentPropsWithRef, forwardRef } from 'react';

import { createScrollable } from '@react-bulk/core';
import { ScrollableProps } from '@react-bulk/core/src/types';

import map from '../map';

type ScrollablePropsWeb = ComponentPropsWithRef<'div'> & ScrollableProps;

const Scrollable = forwardRef(({ ...props }: ScrollablePropsWeb, ref) => {
  return createScrollable(props, ref, map);
});

export default Scrollable;
