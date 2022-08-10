import React from 'react';

import { FactoryProps, LabelProps, TextFactory, clsx } from '@react-bulk/core';

function LabelFactory({ for: htmlFor, className, style, map, ...rest }: FactoryProps & LabelProps, ref: any) {
  const { web, Label } = map;
  const classes: any[] = ['rbk-label', className];

  style = [
    web && {
      textRendering: 'optimizeLegibility',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'font-smooth': 'always',
    },

    style,
  ];

  return <TextFactory map={map} ref={ref} component={Label} {...rest} htmlFor={htmlFor} className={clsx(classes)} style={style} />;
}

export default React.forwardRef(LabelFactory);
