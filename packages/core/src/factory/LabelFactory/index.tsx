import React from 'react';

import { LabelProps } from '../../types';
import clsx from '../../utils/clsx';
import TextFactory from '../TextFactory';

function LabelFactory({ for: htmlFor, className, style, map, ...rest }: LabelProps | any, ref: any) {
  const { web, Label } = map;

  style = [
    web && {
      textRendering: 'optimizeLegibility',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'font-smooth': 'always',
    },

    style,
  ];

  return (
    <TextFactory map={map} ref={ref} component={Label} {...rest} htmlFor={htmlFor} className={clsx('rbk-label', className)} style={style} />
  );
}

export default React.forwardRef(LabelFactory);
