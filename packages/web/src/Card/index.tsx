import { ComponentPropsWithRef, forwardRef } from 'react';

import CardFactory from '@react-bulk/core/src/factory/CardFactory';
import { CardProps } from '@react-bulk/core/src/types';

import map from '../map';

export type CardPropsWeb = ComponentPropsWithRef<'div'> & CardProps;

function Card({ ...props }: CardPropsWeb, ref) {
  return <CardFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Card);
