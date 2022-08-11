import React from 'react';

import { FactoryProps, LabelProps, TextFactory, clsx, useTheme } from '@react-bulk/core';

function LabelFactory({ className, map, ...props }: FactoryProps & LabelProps, ref: any) {
  const theme = useTheme();
  const { web, Label } = map;
  const classes: any[] = ['rbk-label', className];

  // Extends from default props
  props = { ...theme.components.Label.defaultProps, ...props };

  let { for: htmlFor, style, ...rest } = props;

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
