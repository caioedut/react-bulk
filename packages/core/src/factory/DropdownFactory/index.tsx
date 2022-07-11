import React from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import { DropdownProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';

function DropdownFactory({ visible, children, style, map, ...rest }: DropdownProps | any, ref: any) {
  const { web } = Platform;
  const theme = useTheme();

  // useEffect(() => {
  //   if (!web) return;
  //
  //   function clickAway(e) {
  //     console.log(e);
  //     e.target.closest();
  //   }
  //
  //   document.addEventListener('click', clickAway);
  //
  //   return () => document.removeEventListener('click', clickAway);
  // }, []);

  style = [
    {
      position: 'absolute',
      maxWidth: '100%',
      border: `1px solid ${theme.colors.background.secondary}`,
    },

    web && {
      boxShadow: 'rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px',
      transition: `all ${theme.mixins.transition}`,
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
    <BoxFactory map={map} style={{ position: 'relative' }}>
      <CardFactory ref={ref} {...rest} map={map} style={style}>
        {children}
      </CardFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(DropdownFactory);
