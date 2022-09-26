import React from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory from '../../props/factory';
import { FactoryProps, IconProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function IconFactory({ stylist, map, ...props }: FactoryProps & IconProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Icon;
  const { Icons } = map;

  // Extends from default props
  let {
    color,
    name,
    size,
    // Styles
    style,
    ...rest
  } = factory(props, options.defaultProps);

  const fontSize = theme.rem(size);
  const styleProps = extract(['color', 'size', 'weight'], style);

  const iconName = `${name || ''}`
    .split(/_|-|\s/g)
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join('');

  const Component = Icons[iconName] ?? Icons.Question;

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  return (
    <BoxFactory
      ref={ref}
      map={map}
      component={Component}
      stylist={[styleRoot, stylist]}
      {...rest}
      {...styleProps}
      color={theme.color(styleProps?.color ?? color)}
      size={styleProps?.size ?? fontSize}
      style={style}
      noRootStyles
    />
  );
}

export default React.forwardRef(IconFactory);
