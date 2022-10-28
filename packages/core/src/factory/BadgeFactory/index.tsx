import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { BadgeProps, FactoryProps } from '../../types';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

function BadgeFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & BadgeProps) {
  const theme = useTheme();
  const options = theme.components.Badge;
  const { native } = map;

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
    labelStyle,
    style,
    ...rest
  } = factory2(props, options);

  if (typeof size === 'string') {
    size = pick(size, 'medium', {
      xsmall: 0.625,
      small: 0.75,
      medium: 1,
      large: 1.25,
      xlarge: 1.625,
    });
  }

  const absolute = top || bottom || left || right;
  const fontSize = theme.rem(size);
  const baseSize = theme.rem(1.25, fontSize);
  const halfSize = baseSize / 2;

  labelStyle = [
    {
      fontSize: halfSize,
      lineHeight: native ? halfSize : 1,
    },
    labelStyle,
  ];

  style = [
    {
      backgroundColor: color,
      borderColor: color,
      borderRadius: halfSize,
    },

    absolute && {
      position: 'absolute',
      borderColor: theme.colors.background.primary,
    },

    !dot && {
      minHeight: baseSize,
      minWidth: baseSize,
    },

    top && { top: -halfSize },
    bottom && { bottom: -halfSize },
    left && { left: -halfSize },
    right && { right: -halfSize },

    style,
  ];

  return (
    <BoxFactory map={map} innerRef={innerRef} style={style} stylist={[variants.root, stylist]} {...rest}>
      {!dot && (
        <TextFactory map={map} style={labelStyle} stylist={[variants.label]}>
          {value ?? children ?? ''}
        </TextFactory>
      )}
    </BoxFactory>
  );
}

export default React.memo(BadgeFactory);
