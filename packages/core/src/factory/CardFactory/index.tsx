import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { CardProps } from '../../types';
import BoxFactory from '../BoxFactory';

const CardFactory = React.memo<CardProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Card;

    // Extends from default props
    let {
      // Styles
      variants,
      ...rest
    } = factory2<CardProps>(props, options);

    return <BoxFactory ref={ref} stylist={[variants.root, stylist]} {...rest} />;
  }),
);

CardFactory.displayName = 'CardFactory';

export default CardFactory;
