import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { DropdownProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

const DropdownFactory = React.memo<DropdownProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Dropdown;

    // Extends from default props
    let {
      visible,
      // Styles,
      variants,
      ...rest
    } = factory2<DropdownProps>(props, options);

    return (
      <BoxFactory style={{ position: 'relative' }}>
        <CardFactory ref={ref} stylist={[variants.root, stylist]} {...rest}>
          {children}
        </CardFactory>
      </BoxFactory>
    );
  }),
);

DropdownFactory.displayName = 'DropdownFactory';

export default DropdownFactory;
