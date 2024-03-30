import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { LinkProps } from '../../types';
import global from '../../utils/global';
import TextFactory from '../TextFactory';

const LinkFactory = React.memo<LinkProps>(
  forwardRef(({ ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Link;
    const { Link } = global.mapping;

    // Extends from default props
    const {
      underline,
      // Styles
      variants,
      ...rest
    } = factory2<LinkProps>(props, options);

    return <TextFactory ref={ref} component={Link} variants={{ root: variants.root }} {...rest} />;
  }),
);

LinkFactory.displayName = 'LinkFactory';

export default LinkFactory;
