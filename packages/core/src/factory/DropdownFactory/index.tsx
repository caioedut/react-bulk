import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { DropdownProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

function DropdownFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & DropdownProps) {
  const theme = useTheme();
  const options = theme.components.Dropdown;

  // Extends from default props
  let {
    visible,
    // Styles,
    variants,
    ...rest
  } = factory2(props, options);

  return (
    <BoxFactory map={map} style={{ position: 'relative' }}>
      <CardFactory map={map} innerRef={innerRef} stylist={[variants.root, stylist]} {...rest}>
        {children}
      </CardFactory>
    </BoxFactory>
  );
}

export default React.memo(DropdownFactory);
