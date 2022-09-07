import React, { isValidElement } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
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
    size,
    startIcon,
    variant,
    // Styles
    labelStyle,
    contentStyle,
    ...rest
  } = factory(props, options.defaultProps);

  const form = useForm();
  const isBasic = ['outline', 'text'].includes(variant);

  badge = typeof badge === 'number' ? { value: badge } : badge;
  children = children ?? label;

  if (web && !rest.type) {
    rest.type = 'button';
  }

  if (form && rest.type === 'submit' && !props.onPress && !props.onClick) {
    rest.onPress = form.submit;
  }

  if (native) {
    delete rest.type;
  }

  if (icon) {
    if (typeof icon === 'string') {
      startIcon = icon;
    }

    if (isValidElement(icon)) {
      children = icon;
    }
  }

  const multiplier = pick(size, 'medium', {
    xsmall: 0.625,
    small: 0.75,
    medium: 1,
    large: 1.25,
    xlarge: 1.625,
  });

  const fontSize = theme.rem(multiplier);
  const lineSize = theme.rem(theme.typography.lineHeight, fontSize);
  const spacing = theme.rem(0.5, fontSize);
  const height = lineSize + spacing * 2;
  const textColor = isBasic ? color : theme.contrast(color);

  if (typeof children === 'string') {
    children = (
      <TextFactory map={map} style={[{ fontSize, color: textColor }, labelStyle]}>
        {children}
      </TextFactory>
    );
  }

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleBlock = useStylist({
    avoid: !block,
    name: options.name + '-block',
    style: { width: '100%' },
  });

  const styleDisabled = useStylist({
    avoid: !disabled,
    name: options.name + '-disabled',
    style: {
      opacity: 0.75,
      web: { cursor: 'not-allowed', '& *': { cursor: 'not-allowed' } },
    },
  });

  const styleColor = useStylist({
    style: [
      {
        backgroundColor: color,
        borderColor: color,
      },

      isBasic && { backgroundColor: 'common.trans' },

      variant === 'text' && { borderColor: 'common.trans' },

      web && { '&:focus': { boxShadow: `0 0 0 4px ${theme.hex2rgba(color, 0.3)}` } },
    ],
  });

  const styleState = useStylist({
    style: [
      {
        minHeight: height,
        minWidth: height,
        paddingHorizontal: spacing,
      },

      icon && {
        borderRadius: height / 2,
        height,
        width: height,
      },
    ],
  });

  return (
    <BoxFactory
      map={map}
      ref={ref}
      component={web && rest.href ? 'a' : Button}
      stylist={[styleRoot, styleBlock, styleDisabled, styleColor, styleState, stylist]}
      {...rest}
      disabled={disabled}
    >
      {Boolean(startIcon) && (
        <BoxFactory map={map}>
          {typeof startIcon === 'string' ? <IconFactory map={map} name={startIcon} color={textColor} size={lineSize} /> : startIcon}
        </BoxFactory>
      )}

      {Boolean(children || children?.length) && (
        <BoxFactory
          map={map}
          style={[
            contentStyle,
            {
              display: 'flex',
              opacity: loading ? 0 : 1,
              ml: startIcon ? 2 : 0,
              mr: endIcon ? 2 : 0,
            },
          ]}
        >
          {children}
        </BoxFactory>
      )}

      {Boolean(endIcon) && (
        <BoxFactory map={map}>
          {typeof endIcon === 'string' ? <IconFactory map={map} name={endIcon} color={textColor} size={lineSize} /> : endIcon}
        </BoxFactory>
      )}

      {loading && (
        <BoxFactory map={map} position="absolute" i={0} center>
          <LoadingFactory map={map} color={textColor} size={lineSize} />
        </BoxFactory>
      )}

      {Boolean(badge) && <BadgeFactory map={map} top right {...badge} />}
    </BoxFactory>
  );
}

export default React.forwardRef(ButtonFactory);
