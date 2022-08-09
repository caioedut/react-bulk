import { ComponentPropsWithRef, forwardRef } from 'react';

import { CardFactory, CardProps } from '@react-bulk/core';

import useMap from '../useMap';

export type CardPropsWeb = ComponentPropsWithRef<'div'> & CardProps;

function Card({ ...props }: CardPropsWeb, ref) {
  const map = useMap();

  return <CardFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Card);
