import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, LabelProps } from '../../types';
import TextFactory from '../TextFactory';

function LabelFactory({ className, map, ...props }: FactoryProps & LabelProps, ref: any) {
  const theme = useTheme();
  const { web, Label } = map;

  // Extends from default props
  props = { ...theme.components.Label.defaultProps, ...props };

  let { for: htmlFor, ...rest } = props;

  const styleRoot = createStyle({
    name: 'rbk-label',
    type: 'component',
    style: web && {
      textRendering: 'optimizeLegibility',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'font-smooth': 'always',
    },
  });

  const styles = [styleRoot, className];

  return <TextFactory map={map} ref={ref} component={Label} {...rest} htmlFor={htmlFor} className={styles} />;
}

export default React.forwardRef(LabelFactory);
