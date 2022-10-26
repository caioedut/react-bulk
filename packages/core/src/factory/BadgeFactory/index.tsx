import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { BadgeProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import TextFactory from '../TextFactory';

function BadgeFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & BadgeProps) {
  const theme = useTheme();
  const options = theme.components.Badge;
  const { native, Text } = map;

  // Extends from default props
  let {
    bottom,
    color,
    dot,
    left,
    right,
    size,
    top,
    value,
    // Styles,
    variants,
    ...rest
  } = factory2(props, options);

  const absolute = top || bottom || left || right;
  const baseSize = size === 'small' ? theme.rem(1) : size === 'large' ? theme.rem(1.5) : theme.rem(1.25);
  const halfBaseSize = baseSize / 2;

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
        py: halfBaseSize * 0.08,
      },
    ],
  });

  return (
    <TextFactory map={map} innerRef={innerRef} stylist={[variants, styleState, stylist]} {...rest}>
      {!dot && <Text>{value ?? children ?? '&nbsp;'}</Text>}
    </TextFactory>
  );
}

export default React.memo(BadgeFactory);
