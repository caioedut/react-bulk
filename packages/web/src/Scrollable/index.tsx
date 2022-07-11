import { ComponentPropsWithRef, forwardRef } from 'react';

import ScrollableFactory from '@react-bulk/core/src/factory/ScrollableFactory';
import { ScrollableProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type ScrollablePropsWeb = ComponentPropsWithRef<'div'> & ScrollableProps;

function Scrollable({ ...props }: ScrollablePropsWeb, ref) {
  const map = useMap();

  return <ScrollableFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Scrollable);
