import React from 'react';

import Platform from '../../Platform';
import { useTheme } from '../../ReactBulk';
import { DropdownProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

function DropdownFactory({ visible, children, style, map, ...rest }: DropdownProps | any, ref: any) {
  const { web } = Platform;
  const theme = useTheme();

  style = [
    {
      position: 'absolute',
      maxWidth: '100%',
      border: `1px solid ${theme.colors.background.secondary}`,
    },

    web && {
      boxShadow: 'rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px',
      transition: 'all 0.4s ease',
      opacity: 0,
      visibility: 'hidden',
      zIndex: -1,
    },

    web &&
      visible && {
        opacity: 1,
        visibility: 'visible',
        zIndex: theme.mixins.zIndex.dropdown,
      },

    style,
  ];

  return (
    <BoxFactory map={map} ref={ref} {...rest} style={{ position: 'relative' }}>
      <CardFactory map={map} style={style}>
        {children}
      </CardFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(DropdownFactory);
