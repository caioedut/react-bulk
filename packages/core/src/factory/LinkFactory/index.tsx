import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FactoryProps, LinkProps } from '../../types';
import TextFactory from '../TextFactory';

function LinkFactory({ stylist, map, innerRef, ...props }: FactoryProps & LinkProps) {
  const theme = useTheme();
  const options = theme.components.Link;
  const { Link } = map;

  // Extends from default props
  let {
    underline,
    // Styles
    variants,
    ...rest
  } = factory2(props, options);

  return <TextFactory map={map} innerRef={innerRef} component={Link} stylist={[variants.root, stylist]} {...rest} />;
}

const Memoized = React.memo(LinkFactory);
Memoized.displayName = 'LinkFactory';

export default Memoized;
