import React, { forwardRef } from 'react';

import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { GrowBoxProps } from '../types';
import BoxFactory from './BoxFactory';

/**
 * @deprecated use Box instead. GrowBox no longer animates and renders a plain Box.
 */
const GrowBoxFactory = React.memo<GrowBoxProps>(
  forwardRef(({ ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.GrowBox;

    // Extends from default props
    const {
      duration: _duration,
      // Styles
      variants,
      ...rest
    } = factory2<GrowBoxProps>(props, options);

    return <BoxFactory ref={ref} variants={{ root: variants.root }} {...rest} />;
  }),
);

GrowBoxFactory.displayName = 'GrowBoxFactory';

export default GrowBoxFactory;
