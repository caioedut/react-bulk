import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { ButtonProps, FactoryProps } from '../../types';
import pick from '../../utils/pick';
import BadgeFactory from '../BadgeFactory';
import BoxFactory from '../BoxFactory';
import { useForm } from '../FormFactory';
import LoadingFactory from '../LoadingFactory';
import TextFactory from '../TextFactory';

function ButtonFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & ButtonProps) {
  const theme = useTheme();
  const options = theme.components.Button;
  const { web, native, Button } = map;

  // Extends from default props
  let {
    badge,
    block,
    circular,
    color,
    disabled,
    endAddon,
    endIcon,
    icon,
    label,
    loading,
    transform,
    size,
    startAddon,
    startIcon,
    variant,
    // Styles
    variants,
    labelStyle,
    contentStyle,
    style,
    ...rest
  } = factory2(props, options);

  const form = useForm();
  const isBasic = ['outline', 'text'].includes(variant);

  children = children ?? label;
  badge = typeof badge === 'number' ? { value: badge } : badge;
  startAddon = startAddon ?? startIcon;
  endAddon = endAddon ?? endIcon;

  if (web && !rest.type) {
    rest.type = 'button';
  }

  if (form && !props.onPress && !props.onClick) {
    if (rest.type === 'submit') {
      rest.onPress = form.submit;
    }

    if (rest.type === 'cancel') {
      rest.type = 'button';
      rest.onPress = form.cancel;
    }

    if (['clear', 'reset'].includes(rest.type)) {
      rest.type = 'button';
      rest.onPress = form.clear;
    }
  }

  if (native) {
    delete rest.type;
  }

  if (typeof size === 'string') {
    size = pick(size, 'medium', {
      xsmall: 0.75,
      small: 0.875,
      medium: 1,
      large: 1.25,
      xlarge: 1.625,
    });
  }

  const baseSize = theme.rem(size);
  const spacing = baseSize / 2;
  const height = baseSize * 2;
  const textColor = isBasic ? color : 'white';

  style = [
    {
      minHeight: height,
      minWidth: height,
      paddingHorizontal: spacing,
    },

    circular && {
      borderRadius: height / 2,
      paddingHorizontal: spacing / 2,
    },

    color && { borderColor: color },

    color && !isBasic && { backgroundColor: color },

    web && { '&:focus': { boxShadow: `0 0 0 4px ${theme.hex2rgba(color, 0.3)}` } },

    web && color && { '&:hover': { bg: theme.hex2rgba(color, isBasic ? 0.1 : 0.8) } },

    style,
  ];

  labelStyle = [{ color: textColor }, labelStyle];

  if (typeof children === 'string') {
    children = (
      <TextFactory map={map} style={labelStyle} stylist={[variants.label]}>
        {children}
      </TextFactory>
    );
  }

  return (
    <BoxFactory
      map={map}
      innerRef={innerRef}
      component={web && rest.href ? 'a' : Button}
      style={style}
      stylist={[variants.root, stylist]}
      {...rest}
      disabled={disabled}
    >
      {Boolean(startAddon) && <BoxFactory map={map}>{startAddon}</BoxFactory>}

      {Boolean(children || children?.length) && (
        <BoxFactory
          map={map}
          style={[contentStyle, loading && { opacity: 0 }, startAddon && { marginLeft: spacing }, endAddon && { marginRight: spacing }]}
        >
          {children}
        </BoxFactory>
      )}

      {Boolean(endAddon) && <BoxFactory map={map}>{endAddon}</BoxFactory>}

      {loading && (
        <BoxFactory map={map} position="absolute" i={0} center>
          <LoadingFactory map={map} color={textColor} size={size} />
        </BoxFactory>
      )}

      {Boolean(badge) && <BadgeFactory map={map} top right {...badge} />}
    </BoxFactory>
  );
}

export default React.memo(ButtonFactory);
