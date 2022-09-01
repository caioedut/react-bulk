import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { CardProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function CardFactory({ className, map, ...props }: FactoryProps & CardProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Card;

  // Extends from default props
  let { defaultStyle, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styles = [styleRoot, className];

  return <BoxFactory map={map} ref={ref} {...rest} className={styles} />;
}

export default React.forwardRef(CardFactory);
