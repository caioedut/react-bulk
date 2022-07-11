import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import CardFactory from '@react-bulk/core/src/factory/CardFactory';
import { CardProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type CardPropsNative = ViewProps & CardProps;

function Card({ ...props }: CardPropsNative, ref) {
  const map = useMap();
  const { Button } = map;

  if (!props.component && (props.onPress || props.onClick)) {
    props.component = Button;
  }

  return <CardFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Card);
