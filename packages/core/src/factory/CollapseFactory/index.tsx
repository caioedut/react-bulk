import React from 'react';

import { CollapseProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function CollapseFactory({ className, map, ...rest }: CollapseProps | any, ref: any) {
  return <BoxFactory map={map} ref={ref} {...rest} className={clsx('rbk-collapse', className)} />;
}

export default React.forwardRef(CollapseFactory);
