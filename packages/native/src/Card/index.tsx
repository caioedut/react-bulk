import React, { forwardRef } from 'react';

import { createCard } from '@react-bulk/core';
import { CardProps } from '@react-bulk/core/types';

import map from '../../map';

const Card = forwardRef((props: CardProps, ref) => {
  return createCard(props, ref, map);
});

export default Card;
