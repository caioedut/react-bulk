import React from 'react';

import { BoxFactory, CardFactory, DropdownProps, FactoryProps, clsx, useTheme } from '@react-bulk/core';

function DropdownFactory({ visible, children, className, style, map, ...rest }: FactoryProps & DropdownProps, ref: any) {
  const theme = useTheme();
  const { web, native } = map;
  const classes: any[] = ['rbk-dropdown', className];

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
      zIndex: -1,
    },

    visible && {
      zIndex: theme.mixins.zIndex.dropdown,
    },

    web && {
      boxShadow: 'rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px',
      transition: `all ${theme.mixins.transition}`,
      opacity: 0,
      visibility: 'hidden',
    },

    web &&
      visible && {
        opacity: 1,
        visibility: 'visible',
      },

    native &&
      !visible && {
        display: 'none',
      },

    style,
  ];

  return (
    <BoxFactory map={map} style={{ position: 'relative' }}>
      <CardFactory ref={ref} {...rest} map={map} className={clsx(classes)} style={style}>
        {children}
      </CardFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(DropdownFactory);
