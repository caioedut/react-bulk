import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import get from '../../props/get';
import { ButtonProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BadgeFactory from '../BadgeFactory';
import BoxFactory from '../BoxFactory';
import { useForm } from '../FormFactory';
import GroupFactory from '../GroupFactory';
import LabelFactory from '../LabelFactory';

function ButtonFactory({ stylist, children, map, ...props }: FactoryProps & ButtonProps, ref) {
  const theme = useTheme();
  const options = theme.components.Button;
  const { web, native, Button, Text } = map;

  // Extends from default props
  let { badge, labelStyle, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const form = useForm();

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  if (web && !rest.type) {
    rest.type = 'button';
  }

  if (form && rest.type === 'submit' && !props.onPress && !props.onClick) {
    rest.onPress = form.submit;
  }

  if (native) {
    delete rest.type;
  }

  stylist = [styleRoot, stylist];

  return (
    <GroupFactory
      // Custom
      map={map}
      ref={ref}
      component={web && rest.href ? 'a' : Button}
      stylist={stylist}
      {...rest}
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
