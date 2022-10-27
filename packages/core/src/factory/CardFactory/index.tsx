import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { CardProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';

function CardFactory({ stylist, map, innerRef, ...props }: FactoryProps & CardProps) {
  const theme = useTheme();
  const options = theme.components.Card;

  // Extends from default props
  let {
    // Styles
    variants,
    ...rest
  } = factory2(props, options);

  return <BoxFactory map={map} innerRef={innerRef} stylist={[variants.root, stylist]} {...rest} />;
}

export default React.memo(CardFactory);
