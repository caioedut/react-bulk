import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { FactoryProps, LinkProps } from '../../types';
import TextFactory from '../TextFactory';

function LinkFactory({ stylist, map, ...props }: FactoryProps & LinkProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Link;
  const { Link } = map;

  // Extends from default props
  let {
    underline,
    // Styles
    variants,
    ...rest
  } = factory2(props, options, theme);

  return <TextFactory map={map} ref={ref} component={Link} stylist={[variants.root, stylist]} {...rest} />;
}

export default React.forwardRef(LinkFactory);