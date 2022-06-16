import React, { ComponentPropsWithRef, forwardRef } from 'react';

import { createCard } from '@react-bulk/core';
import { CardProps } from '@react-bulk/core/types';

import map from '../../map';

type CardPropsWeb = ComponentPropsWithRef<'div'> & CardProps;

const Card = forwardRef(({ ...props }: CardPropsWeb, ref) => {
  return createCard(props, ref, map);
});

export default Card;
