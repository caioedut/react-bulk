import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { CardProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function CardFactory({ stylist, map, innerRef, ...props }: FactoryProps & CardProps) {
  const theme = useTheme();
  const options = theme.components.Card;

  // Extends from default props
  let { ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  return <BoxFactory map={map} innerRef={innerRef} stylist={[styleRoot, stylist]} {...rest} />;
}

export default React.memo(CardFactory);
