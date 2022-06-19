import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { createCard } from '@react-bulk/core';
import { CardProps } from '@react-bulk/core/src/types';

import map from '../map';

type CardPropsNative = ViewProps & CardProps;

const Card = forwardRef(({ ...props }: CardPropsNative, ref) => {
  return createCard(props, ref, map);
});

export default Card;
