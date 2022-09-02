import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { BadgeProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import TextFactory from '../TextFactory';

function BadgeFactory({ stylist, children, map, ...props }: FactoryProps & BadgeProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Badge;
  const { native, Text } = map;

  // Extends from default props
  let { bottom, color, dot, left, right, size, top, value, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const absolute = top || bottom || left || right;
  const baseSize = size === 'small' ? theme.rem(1) : size === 'large' ? theme.rem(1.5) : theme.rem(1.25);
  const halfBaseSize = baseSize / 2;

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleState = useStylist({
    style: [
      {
        backgroundColor: color,
        borderRadius: halfBaseSize,
      },

      absolute && {
        position: 'absolute',
        borderWidth: 1,
        borderColor: theme.colors.background.primary,
        borderStyle: 'solid',
      },

      top && { top: -halfBaseSize },
      bottom && { bottom: -halfBaseSize },
      left && { left: -halfBaseSize },
      right && { right: -halfBaseSize },

      dot && {
        borderRadius: halfBaseSize / 2,
        height: halfBaseSize,
        width: halfBaseSize,
      },

      !dot && {
        px: halfBaseSize * 0.15,
        height: baseSize,
        minWidth: baseSize,
      },

      native && {
        py: halfBaseSize * 0.06,
      },
    ],
  });

  stylist = [styleRoot, styleState, stylist];

  return (
    <TextFactory map={map} ref={ref} stylist={stylist} {...rest}>
      {!dot && <Text>{value ?? children ?? '&nbsp;'}</Text>}
    </TextFactory>
  );
}

export default React.forwardRef(BadgeFactory);
