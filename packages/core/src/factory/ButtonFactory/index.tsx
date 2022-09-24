import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { ButtonProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import pick from '../../utils/pick';
import BadgeFactory from '../BadgeFactory';
import BoxFactory from '../BoxFactory';
import { useForm } from '../FormFactory';
import IconFactory from '../IconFactory';
import LoadingFactory from '../LoadingFactory';
import TextFactory from '../TextFactory';

function ButtonFactory({ stylist, children, map, ...props }: FactoryProps & ButtonProps, ref) {
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
    variants,
    // Styles
    labelStyle,
    contentStyle,
    ...rest
  } = factory2(props, options, theme);

  const form = useForm();
  const isBasic = ['outline', 'text'].includes(variant);
  const dynamic = !isNaN(size);

  badge = typeof badge === 'number' ? { value: badge } : badge;
  children = children ?? label;
  startIcon = startIcon ?? icon;

  if (web && !rest.type) {
    rest.type = 'button';
  }

  if (form && rest.type === 'submit' && !props.onPress && !props.onClick) {
    rest.onPress = form.submit;
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
  const spacing = theme.rem(0.5, fontSize);
  const height = fontSize * 2;
  const textColor = isBasic ? color : theme.contrast(color);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleLabel = useStylist({
    name: options.name + '-label',
    style: options.defaultStyles.label,
  });

  const styleColor = useStylist({
    avoid: color === options.defaultProps.color,
    style: [
      color && { borderColor: color },
      color && !isBasic && { backgroundColor: color },
      web && { '&:focus': { boxShadow: `0 0 0 4px ${theme.hex2rgba(color, 0.3)}` } },
      web && color && { '&:hover': { bg: theme.hex2rgba(color, isBasic ? 0.1 : 0.9) } },
    ],
  });

  const styleState = useStylist({
    style: [
      dynamic && {
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
      <TextFactory map={map} transform={transform} style={[{ color: textColor }, labelStyle]} stylist={[styleLabel, variants?.label]}>
        {children}
      </TextFactory>
    );
  }

  return (
    <BoxFactory
      map={map}
      ref={ref}
      component={web && rest.href ? 'a' : Button}
      stylist={[styleRoot, variants?.root, styleColor, styleState, stylist]}
      {...rest}
      disabled={disabled}
    >
      {Boolean(startIcon) && (
        <BoxFactory map={map}>
          {typeof startIcon === 'string' ? <IconFactory map={map} name={startIcon} color={textColor} size={size} /> : startIcon}
        </BoxFactory>
      )}

      {Boolean(children || children?.length) && (
        <BoxFactory map={map} style={[contentStyle, loading && { opacity: 0 }, startIcon && { ml: 2 }, endIcon && { mr: 2 }]}>
          {children}
        </BoxFactory>
      )}

      {Boolean(endIcon) && (
        <BoxFactory map={map}>
          {typeof endIcon === 'string' ? <IconFactory map={map} name={endIcon} color={textColor} size={size} /> : endIcon}
        </BoxFactory>
      )}

      {loading && (
        <BoxFactory map={map} position="absolute" i={0} center>
          <LoadingFactory map={map} color={textColor} size={size} />
        </BoxFactory>
      )}

      {Boolean(badge) && <BadgeFactory map={map} top right {...badge} />}
    </BoxFactory>
  );
}

export default React.forwardRef(ButtonFactory);
