import React from 'react';

import Platform from '../../Platform';
import { ScrollableProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function ScrollableFactory({ horizontal, className, style, map, ...rest }: ScrollableProps | any, ref: any) {
  const { web, native } = Platform;
  const { ScrollView } = map;

  style = [
    { flex: 1 },

    web && horizontal && { overflowX: 'auto' },

    web && !horizontal && { overflowY: 'auto' },

    web && { scrollBehavior: 'smooth' },

    style,
  ];

  if (native) {
    rest.horizontal = horizontal;
  }

  return <BoxFactory map={map} ref={ref} component={ScrollView} {...rest} className={clsx('rbk-scrollable', className)} style={style} />;
}

export default React.forwardRef(ScrollableFactory);
