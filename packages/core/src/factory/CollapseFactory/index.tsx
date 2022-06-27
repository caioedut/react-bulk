import React from 'react';

import { CollapseProps } from '../../types';
import BoxFactory from '../BoxFactory';

function CollapseFactory({ map, ...rest }: CollapseProps | any, ref: any) {
  return <BoxFactory map={map} ref={ref} {...rest} />;
}

export default React.forwardRef(CollapseFactory);
