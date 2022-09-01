import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { CollapseProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';

function CollapseFactory({ className, map, ...props }: FactoryProps & CollapseProps, ref: any) {
  const theme = useTheme();

  // Extends from default props
  props = { ...theme.components.Collapse.defaultProps, ...props };

  let { ...rest } = props;

  const styleRoot = createStyle({
    insert: 'before',
    name: 'rbk-collapse',
    style: null,
  });

  const styles = [styleRoot, className];

  return <BoxFactory map={map} ref={ref} {...rest} className={styles} />;
}

export default React.forwardRef(CollapseFactory);
