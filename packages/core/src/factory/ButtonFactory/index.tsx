import React from 'react';

import { useTheme } from '../../ReactBulk';
import get from '../../props/get';
import { ButtonProps, FactoryProps } from '../../types';
import clsx from '../../utils/clsx';
import BadgeFactory from '../BadgeFactory';
import BoxFactory from '../BoxFactory';
import { useForm } from '../FormFactory';
import GroupFactory from '../GroupFactory';
import LabelFactory from '../LabelFactory';

function ButtonFactory({ className, children, map, ...props }: FactoryProps & ButtonProps, ref) {
  const theme = useTheme();
  const { web, native, Button, Text } = map;
  const classes: any[] = ['rbk-button', className];

  // Extends from default props
  props = { ...theme.components.Button.defaultProps, ...props };

  let { badge, style, labelStyle, ...rest } = props;

  const form = useForm();

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

  if (form && rest.type === 'submit' && !props.onPress && !props.onClick) {
    rest.onPress = form.submit;
  }

  if (native) {
    delete rest.type;
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
