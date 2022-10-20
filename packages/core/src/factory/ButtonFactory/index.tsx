import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { ButtonProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
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
    color,
    disabled,
    endIcon,
    icon,
    label,
    loading,
    transform,
    rounded,
    size,
    startIcon,
    variant,
    // Styles
    variants,
    labelStyle,
    contentStyle,
    ...rest
  } = factory2(props, options, theme);

  const form = useForm();
  const isBasic = ['outline', 'text'].includes(variant);

  badge = typeof badge === 'number' ? { value: badge } : badge;
  children = children ?? label;
  startIcon = startIcon ?? icon;

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
      xsmall: 0.625,
      small: 0.75,
      medium: 1,
      large: 1.25,
      xlarge: 1.625,
    });
  }

  const fontSize = theme.rem(size);
  const spacing = theme.rem(1, fontSize);
  const height = fontSize * +options.defaultStyles.root.minHeight.replace(/[^.\d]/g, '');
  const textColor = isBasic ? color : 'white';

  const styleColor = useStylist({
    style: [
      color && { borderColor: color },
      color && !isBasic && { backgroundColor: color },
      web && { '&:focus': { boxShadow: `0 0 0 4px ${theme.hex2rgba(color, 0.3)}` } },
      web && color && { '&:hover': { bg: theme.hex2rgba(color, isBasic ? 0.1 : 0.8) } },
    ],
  });

  const styleState = useStylist({
    style: [
      {
        minHeight: height,
        minWidth: height,
        paddingHorizontal: spacing,
      },

      rounded && {
        borderRadius: height / 2,
        height,
        width: height,
      },
    ],
  });

  if (typeof children === 'string') {
    children = (
      <TextFactory map={map} transform={transform} style={[{ color: textColor, fontSize }, labelStyle]} stylist={[variants.label]}>
        {children}
      </TextFactory>
    );
  }

  return (
    <BoxFactory
      map={map}
      innerRef={innerRef}
      component={web && rest.href ? 'a' : Button}
      stylist={[variants.root, styleColor, styleState, stylist]}
      {...rest}
      disabled={disabled}
    >
      {Boolean(startIcon) && <BoxFactory map={map}>{startIcon}</BoxFactory>}

      {Boolean(children || children?.length) && (
        <BoxFactory map={map} style={[contentStyle, loading && { opacity: 0 }, startIcon && { ml: 2 }, endIcon && { mr: 2 }]}>
          {children}
        </BoxFactory>
      )}

      {Boolean(endIcon) && <BoxFactory map={map}>{endIcon}</BoxFactory>}

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
