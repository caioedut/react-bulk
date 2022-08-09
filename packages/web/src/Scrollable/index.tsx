import { ComponentPropsWithRef, forwardRef } from 'react';

import { ScrollableFactory, ScrollableProps } from '@react-bulk/core';

import useMap from '../useMap';

export type ScrollablePropsWeb = ComponentPropsWithRef<'div'> & ScrollableProps;

function Scrollable({ ...props }: ScrollablePropsWeb, ref) {
  return <ScrollableFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Scrollable);
