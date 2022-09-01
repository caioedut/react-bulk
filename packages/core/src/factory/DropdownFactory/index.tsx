import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { DropdownProps, FactoryProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

function DropdownFactory({ className, children, map, ...props }: FactoryProps & DropdownProps, ref: any) {
  const theme = useTheme();
  const { native } = map;

  // Extends from default props
  props = { ...theme.components.Dropdown.defaultProps, ...props };

  let { visible, ...rest } = props;

  const styleRoot = createStyle({
    insert: 'before',
    name: 'rbk-dropdown',
    style: {
      position: 'absolute',
      maxWidth: '100%',
      border: `1px solid ${theme.colors.background.secondary}`,
      zIndex: -1,
      web: {
        boxShadow: 'rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px',
        transition: `all ${theme.mixins.transition}`,
        opacity: 0,
        visibility: 'hidden',
      },
    },
  });

  const styleVisible = createStyle({
    insert: 'before',
    name: 'rbk-dropdown-visible',
    style: {
      zIndex: theme.mixins.zIndex.dropdown,
      web: {
        opacity: 1,
        visibility: 'visible',
      },
    },
  });

  const styleState = createStyle({
    insert: 'before',
    style: native && !visible && { display: 'none' },
  });

  const styles = [styleRoot, styleState, visible && styleVisible, className];

  return (
    <BoxFactory map={map} style={{ position: 'relative' }}>
      <CardFactory ref={ref} {...rest} map={map} className={styles}>
        {children}
      </CardFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(DropdownFactory);
