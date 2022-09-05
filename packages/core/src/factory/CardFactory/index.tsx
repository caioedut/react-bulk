import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { CardProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function CardFactory({ stylist, map, ...props }: FactoryProps & CardProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Card;

  // Extends from default props
  let { ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  stylist = [styleRoot, stylist];

  return <BoxFactory map={map} ref={ref} stylist={stylist} {...rest} />;
}

export default React.forwardRef(CardFactory);
