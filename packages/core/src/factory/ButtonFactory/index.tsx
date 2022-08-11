import React from 'react';

import { BadgeFactory, BoxFactory, ButtonProps, FactoryProps, GroupFactory, LabelFactory, clsx, get, useTheme } from '@react-bulk/core';

function ButtonFactory({ className, children, map, ...props }: FactoryProps & ButtonProps, ref) {
  const theme = useTheme();
  const { web, Button, Text } = map;
  const classes: any[] = ['rbk-button', className];

  // Extends from default props
  props = { ...theme.components.Button.defaultProps, ...props };

  let { autoFocus, badge, style, labelStyle, ...rest } = props;

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
      component={web && rest.href ? 'a' : Button}
      {...rest}
      // Component
      className={clsx(classes)}
      autoFocus={autoFocus}
      // Styles
      style={style}
      // Other
      renderChildren={(style) => {
        badge = typeof badge === 'number' ? { value: badge } : badge;

        return (
          <>
            {typeof children === 'string' ? (
              <LabelFactory
                map={map}
                component={Text}
                style={[
                  {
                    color: get('color', style),
                    fontSize: get('fontSize', style),
                    opacity: rest.loading ? 0 : 1,
                  },
                  labelStyle,
                ]}
              >
                {children}
              </LabelFactory>
            ) : rest.loading ? (
              <BoxFactory map={map} style={{ opacity: 0 }}>
                {children}
              </BoxFactory>
            ) : (
              children
            )}

            {Boolean(badge) && <BadgeFactory map={map} top right {...badge} />}
          </>
        );
      }}
    />
  );
}

export default React.forwardRef(ButtonFactory);
