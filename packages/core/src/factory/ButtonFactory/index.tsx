import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import childrenize from '../../props/childrenize';
import factory2 from '../../props/factory2';
import { ButtonProps } from '../../types';
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
    const { web, native, Button } = global.mapping;

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
    size = size ?? 'medium';

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

    const baseSize = theme.rem(size);
    const spacing = (baseSize - theme.rem(0.75)) / 2;
    const textColor = isBasic ? color : 'white';

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

    contentStyle = [startAddon && { ml: 1.5 }, endAddon && { mr: 1.5 }, loading && { opacity: 0 }, contentStyle];

    labelStyle = [{ color: textColor }, labelStyle];

    children = childrenize(children);

    if (children.every((child) => ['string', 'number'].includes(typeof child))) {
      children = [
        <TextFactory key={0} style={labelStyle} stylist={[variants.label]}>
          {children.join('')}
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
        disabled={disabled}
      >
        {Boolean(startAddon) && <BoxFactory style={loading && { opacity: 0 }}>{startAddon}</BoxFactory>}

        {Boolean(children?.length) && <BoxFactory style={contentStyle}>{children}</BoxFactory>}

        {Boolean(endAddon) && <BoxFactory style={loading && { opacity: 0 }}>{endAddon}</BoxFactory>}

        {loading && (
          <BoxFactory position="absolute" i={0} center>
            <LoadingFactory color={textColor} size={size / 2} />
          </BoxFactory>
        )}

        {Boolean(badge) && <BadgeFactory top right {...badge} />}
      </BoxFactory>
    );
  }),
);

ButtonFactory.displayName = 'ButtonFactory';

export default ButtonFactory;
