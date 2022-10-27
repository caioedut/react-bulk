import React from 'react';

import useStylist from '../../hooks/useStylist';
import useTheme from '../../hooks/useTheme';
import factory from '../../props/factory';
import { DropdownProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

function DropdownFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & DropdownProps) {
  const theme = useTheme();
  const options = theme.components.Dropdown;
  const { native } = map;

  // Extends from default props
  let { visible, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleVisible = useStylist({
    avoid: !visible,
    name: 'rbk-dropdown-visible',
    style: {
      zIndex: theme.mixins.zIndex.dropdown,
      web: {
        opacity: 1,
        visibility: 'visible',
      },
    },
  });

  const styleState = useStylist({
    avoid: visible,
    style: native && { display: 'none' },
  });

  stylist = [styleRoot, styleState, styleVisible, stylist];

  return (
    <BoxFactory map={map} style={{ position: 'relative' }}>
      <CardFactory map={map} innerRef={innerRef} stylist={stylist} {...rest}>
        {children}
      </CardFactory>
    </BoxFactory>
  );
}

export default React.memo(DropdownFactory);
