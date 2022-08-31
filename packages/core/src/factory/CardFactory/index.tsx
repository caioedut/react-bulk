import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { CardProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';

function CardFactory({ className, map, ...props }: FactoryProps & CardProps, ref: any) {
  const theme = useTheme();

  // Extends from default props
  props = { ...theme.components.Card.defaultProps, ...props };

  let { ...rest } = props;

  const styleRoot = createStyle({
    name: 'rbk-card',
    style: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.shape.borderRadius,
      p: 3,
    },
  });

  const styles = [styleRoot, className];

  return <BoxFactory map={map} ref={ref} {...rest} className={styles} />;
}

export default React.forwardRef(CardFactory);
