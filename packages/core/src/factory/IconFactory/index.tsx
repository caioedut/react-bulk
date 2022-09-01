import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, IconProps } from '../../types';
import BoxFactory from '../BoxFactory';

function IconFactory({ className, map, ...props }: FactoryProps & IconProps, ref: any) {
  const theme = useTheme();
  const { Icons } = map;

  // Extends from default props
  props = { ...theme.components.Icon.defaultProps, ...props };

  let { color, name, size, ...rest } = props;

  const iconName = `${name || ''}`
    .split(/_|-|\s/g)
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join('');

  const Component = Icons[iconName] ?? Icons.Question;

  size = size ?? theme.rem(1.25);

  const styleRoot = createStyle({
    insert: 'before',
    name: 'rbk-icon',
    style: {
      web: { verticalAlign: 'text-bottom' },
      native: { marginTop: -4 },
    },
  });

  const styles = [styleRoot, className];

  return <BoxFactory ref={ref} map={map} component={Component} color={theme.color(color)} size={size} {...rest} className={styles} />;
}

export default React.forwardRef(IconFactory);
