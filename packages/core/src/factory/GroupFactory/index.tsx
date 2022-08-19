import React from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import get from '../../props/get';
import { spacings } from '../../styles/jss';
import { GroupProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';
import LabelFactory from '../LabelFactory';
import LoadingFactory from '../LoadingFactory';
import TextFactory from '../TextFactory';

function GroupFactory({ className, children, map, ...props }: GroupProps | any, ref: any) {
  const theme = useTheme();
  const { web } = map;
  const classes: any[] = ['rbk-group', className];

  // Extends from default props
  props = { ...theme.components.Group.defaultProps, ...props };

  let {
    color,
    disabled,
    endIcon,
    error,
    focused,
    id,
    label,
    loading,
    renderChildren,
    size,
    startIcon,
    variant,
    style,
    labelStyle,
    errorStyle,
    containerStyle,
    ...rest
  } = props;

  const fontSize = size === 'small' ? theme.rem(0.75) : size === 'large' ? theme.rem(1.25) : theme.rem(1);
  const iconSize = fontSize * 1.25;

  const focusStyle = {
    outline: 0,
    boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
  };

  containerStyle = [extract(spacings, rest, style), containerStyle];

  style = [
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: color,
      color: theme.colors.common.white,

      fontSize,
      margin: 0,
      padding: theme.rem(0.5, fontSize),
      textDecorationLine: 'none',

      '&:hover': {
        backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.9),
        textDecorationLine: 'none',
      },
    },

    (variant === 'outline' || variant === 'text') && {
      backgroundColor: theme.colors.common.trans,
      borderColor: color,
      color,

      '&:hover': { backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.1) },
    },

    variant === 'text' && {
      borderColor: theme.colors.common.trans,
    },

    (disabled || loading) && { opacity: 0.75 },

    web && focused && focusStyle,

    web && {
      fontFamily: 'inherit',
      touchAction: 'none',
      transitionProperty: 'background-color, box-shadow',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease',

      '&:focus': focusStyle,
      '&:has(:focus)': focusStyle,
    },

    style,

    web &&
      disabled && {
        cursor: 'not-allowed',
        '& *': { cursor: 'not-allowed' },
      },
  ];

  const iconColor = get('color', style);
  const secChildren = renderChildren?.(style);

  return (
    <BoxFactory map={map} style={containerStyle}>
      {Boolean(label) && (
        <LabelFactory map={map} numberOfLines={1} for={id} style={[{ ml: 1, mb: 1 }, labelStyle]}>
          {label}
        </LabelFactory>
      )}

      <BoxFactory map={map} ref={ref} id={id} className={clsx(classes)} {...rest} style={style}>
        {loading && (
          <BoxFactory
            map={map}
            flexbox
            center
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bg: theme.hex2rgba(theme.colors.background.secondary, 0.1),
              borderRadius: get('borderRadius', style),
            }}
          >
            <LoadingFactory map={map} color={iconColor} size={iconSize} />
          </BoxFactory>
        )}

        {Boolean(startIcon) && (
          <BoxFactory map={map} style={{ mr: children || secChildren || endIcon ? 2 : 0 }}>
            {typeof startIcon === 'string' ? <IconFactory map={map} name={startIcon} color={iconColor} size={iconSize} /> : startIcon}
          </BoxFactory>
        )}

        {children}

        {secChildren}

        {Boolean(endIcon) && (
          <BoxFactory map={map} style={{ ml: children || secChildren || startIcon ? 2 : 0 }}>
            {typeof endIcon === 'string' ? <IconFactory map={map} name={endIcon} color={iconColor} size={iconSize} /> : endIcon}
          </BoxFactory>
        )}
      </BoxFactory>

      {Boolean(error) && (
        <TextFactory map={map} numberOfLines={1} color="error" style={{ ml: 1, mt: 1, fontSize: theme.rem(0.75, fontSize) }}>
          {error}
        </TextFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(GroupFactory);
