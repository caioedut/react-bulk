import { forwardRef } from 'react';

import { CardFactory, CardProps } from '@react-bulk/core';

import useMap from '../useMap';

function Card({ ...props }: CardProps, ref) {
  const map = useMap();
  const { Button } = map;

  if (!props.component && (props.onPress || props.onClick)) {
    props.component = Button;
  }

  return <CardFactory ref={ref} {...props} map={map} />;
}

export default forwardRef<typeof Card, CardProps>(Card);
