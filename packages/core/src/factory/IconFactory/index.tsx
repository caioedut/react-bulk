import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, IconProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function IconFactory({ className, map, ...props }: FactoryProps & IconProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Icon;
  const { Icons } = map;

  // Extends from default props
  let { color, name, size, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const iconName = `${name || ''}`
    .split(/_|-|\s/g)
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join('');

  const Component = Icons[iconName] ?? Icons.Question;

  size = size ?? theme.rem(1.25);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styles = [styleRoot, className];

  return <BoxFactory ref={ref} map={map} component={Component} color={theme.color(color)} size={size} {...rest} className={styles} />;
}

export default React.forwardRef(IconFactory);
