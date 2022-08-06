import React from 'react';

import { crypt, uuid } from '@react-bulk/core';

import get from '../../props/get';
import { ButtonProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import GroupFactory from '../GroupFactory';
import LabelFactory from '../LabelFactory';

function ButtonFactory(
  {
    // Html
    id,
    className,
    autoFocus,
    // Styles
    style,
    labelStyle,
    // Core
    children,
    map,
    ...rest
  }: ButtonProps | any,
  ref,
) {
  const { web, Button, Text } = map;
  const classes: any[] = ['rbk-button', className];

  id = id ?? `rbk-${crypt(uuid())}`;

  style = [
    { justifyContent: 'center' },

    web && {
      cursor: 'pointer',
      '-webkit-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',
    },

    style,
  ];

  if (web && !rest.type) {
    rest.type = 'button';
  }

  return (
    <GroupFactory
      // Custom
      map={map}
      ref={ref}
      component={Button}
      {...rest}
      // Html
      id={id}
      className={clsx(classes)}
      autoFocus={autoFocus}
      // Styles
      style={style}
      // Other
      renderChildren={(style) =>
        typeof children === 'string' ? (
          <LabelFactory
            map={map}
            component={Text}
            style={{
              color: get('color', style),
              fontSize: get('fontSize', style),
              opacity: rest.loading ? 0 : 1,
            }}
          >
            {children}
          </LabelFactory>
        ) : rest.loading ? (
          <BoxFactory map={map} style={{ opacity: rest.loading ? 0 : 1 }}>
            {children}
          </BoxFactory>
        ) : (
          children
        )
      }
    />
  );
}

export default React.forwardRef(ButtonFactory);
