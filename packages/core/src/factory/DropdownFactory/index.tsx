import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { DropdownProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

function DropdownFactory({ stylist, children, map, ...props }: FactoryProps & DropdownProps, ref: any) {
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
      <CardFactory map={map} ref={ref} stylist={stylist} {...rest}>
        {children}
      </CardFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(DropdownFactory);
