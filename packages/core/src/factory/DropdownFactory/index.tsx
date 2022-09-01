import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { DropdownProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

function DropdownFactory({ className, children, map, ...props }: FactoryProps & DropdownProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Dropdown;
  const { native } = map;

  // Extends from default props
  let { visible, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
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
    avoid: !native || !visible,
    style: { display: 'none' },
  });

  const styles = [styleRoot, styleState, styleVisible, className];

  return (
    <BoxFactory map={map} style={{ position: 'relative' }}>
      <CardFactory ref={ref} {...rest} map={map} className={styles}>
        {children}
      </CardFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(DropdownFactory);
