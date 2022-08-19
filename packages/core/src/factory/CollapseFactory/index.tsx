import React from 'react';

import { useTheme } from '../../ReactBulk';
import { CollapseProps, FactoryProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function CollapseFactory({ className, map, ...props }: FactoryProps & CollapseProps, ref: any) {
  const theme = useTheme();
  const classes: any[] = ['rbk-collapse', className];

  // Extends from default props
  props = { ...theme.components.Collapse.defaultProps, ...props };

  let { ...rest } = props;

  return <BoxFactory map={map} ref={ref} {...rest} className={clsx(classes)} />;
}

export default React.forwardRef(CollapseFactory);
