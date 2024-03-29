import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import childrenize from '../../props/childrenize';
import factory2 from '../../props/factory2';
import { ButtonProps, RequiredSome } from '../../types';
import global from '../../utils/global';
import pick from '../../utils/pick';
import BadgeFactory from '../BadgeFactory';
import BoxFactory from '../BoxFactory';
import { useForm } from '../FormFactory';
import LoadingFactory from '../LoadingFactory';
import TextFactory from '../TextFactory';

const ButtonFactory = React.memo<ButtonProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Button;
    const { web, Button } = global.mapping;

    // Extends from default props
    let {
      badge,
      circular,
      color,
      contrastColor,
      disabled,
      endAddon,
      endIcon,
      label,
      loading,
      transform,
      type = 'button',
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
    } = factory2<RequiredSome<ButtonProps, 'color' | 'size' | 'transform' | 'variant'>, typeof options>(props, options);

    const form = useForm();
    const isBasic = ['outline', 'text'].includes(variant);

    children = children ?? label;
    contrastColor = contrastColor ?? theme.contrast(color);
    badge = typeof badge === 'number' ? { value: badge } : badge;
    startAddon = startAddon ?? startIcon;
    endAddon = endAddon ?? endIcon;
    size = size ?? 'medium';

    if (form && !props.onPress && !props.onClick) {
      if (type === 'submit') {
        rest.onPress = form.submit;
      }

      if (type === 'cancel') {
        type = 'button';
        rest.onPress = form.cancel;
      }

      if (['clear', 'reset'].includes(type)) {
        type = 'button';
        rest.onPress = form.clear;
      }
    }

    const isSizeNumber = typeof size === 'number';

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 1.25,
        small: 1.75,
        medium: 2.25,
        large: 2.75,
        xlarge: 3.25,
      });
    }

    const baseSize = theme.rem(size as number);
    const spacing = (baseSize - theme.rem(0.75)) / 2;
    const textColor = isBasic ? color : contrastColor;

    style = [
      isSizeNumber && {
        minHeight: baseSize,
        minWidth: baseSize,
        paddingHorizontal: spacing,
      },

      circular && {
        borderRadius: baseSize / 2,
        paddingHorizontal: 0,
      },

      color && variant !== 'text' && { borderColor: color },

      color && !isBasic && { backgroundColor: color },

      web &&
        color && {
          '&:hover': { bg: theme.color(color, isBasic ? 0.2 : 0.8) },
          '&:focus': { boxShadow: `0 0 0 4px ${theme.color(color, 0.3)}` },
        },

      style,
    ];

    contentStyle = [
      { maxw: '100%' },
      startAddon && { ml: 1.5 },
      endAddon && { mr: 1.5 },
      loading && { opacity: 0 },
      contentStyle,
    ];

    labelStyle = [{ color: textColor }, labelStyle];

    let childrenArray = childrenize(children);

    if (childrenArray.length && childrenArray.every((child) => ['string', 'number'].includes(typeof child))) {
      childrenArray = [
        <TextFactory key={0} style={labelStyle} stylist={[variants.label]}>
          {childrenArray.join('')}
        </TextFactory>,
      ];
    }

    return (
      <BoxFactory
        ref={ref}
        component={web && rest.href ? 'a' : Button}
        style={style}
        stylist={[variants.root, stylist]}
        {...rest}
        type={type}
        disabled={disabled}
      >
        {Boolean(startAddon) && <BoxFactory style={loading && { opacity: 0 }}>{startAddon}</BoxFactory>}

        {Boolean(childrenArray?.length) && <BoxFactory style={contentStyle}>{childrenArray}</BoxFactory>}

        {Boolean(endAddon) && <BoxFactory style={loading && { opacity: 0 }}>{endAddon}</BoxFactory>}

        {loading && (
          <BoxFactory position="absolute" i={0} center>
            <LoadingFactory color={textColor} size={(size as number) / 2} />
          </BoxFactory>
        )}

        {Boolean(badge) && <BadgeFactory top right {...badge} />}
      </BoxFactory>
    );
  }),
);

ButtonFactory.displayName = 'ButtonFactory';

export default ButtonFactory;
