import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { DividerProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';

function DividerFactory({ className, map, ...props }: FactoryProps & DividerProps, ref: any) {
  const theme = useTheme();

  // Extends from default props
  props = { ...theme.components.Divider.defaultProps, ...props };

  let { color, opacity, size, vertical, ...rest } = props;

  const styleRoot = createStyle({
    name: 'rbk-divider',
    style: null,
  });

  const styleState = createStyle({
    style: {
      backgroundColor: color,
      height: vertical ? '100%' : size,
      width: vertical ? size : '100%',
      opacity,
    },
  });

  const styles = [styleRoot, styleState, className];

  return <BoxFactory map={map} ref={ref} {...rest} className={styles} />;
}

export default React.forwardRef(DividerFactory);
