import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { LinkProps } from '../../types';
import TextFactory from '../TextFactory';

const LinkFactory = React.memo<LinkProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Link;
    const { Link } = global._rbk_mapping;

    // Extends from default props
    let {
      underline,
      // Styles
      variants,
      ...rest
    } = factory2(props, options);

    return <TextFactory ref={ref} component={Link} stylist={[variants.root, stylist]} {...rest} />;
  }),
);

LinkFactory.displayName = 'LinkFactory';

export default LinkFactory;
