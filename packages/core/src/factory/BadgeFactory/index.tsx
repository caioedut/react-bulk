import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { BadgeProps, FactoryProps } from '../../types';
import TextFactory from '../TextFactory';

function BadgeFactory({ className, children, map, ...props }: FactoryProps & BadgeProps, ref: any) {
  const theme = useTheme();
  const { native, Text } = map;

  // Extends from default props
  props = { ...theme.components.Badge.defaultProps, ...props };

  let { bottom, color, dot, left, right, size, top, value, ...rest } = props;

  const absolute = top || bottom || left || right;
  const baseSize = size === 'small' ? theme.rem(1) : size === 'large' ? theme.rem(1.5) : theme.rem(1.25);
  const halfBaseSize = baseSize / 2;

  const styleRoot = createStyle({
    name: 'rbk-badge',
    type: 'component',
    style: {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',

      color: theme.colors.common.white,
      fontSize: theme.rem(0.625),
      fontWeight: 'bold',

      web: {
        display: 'inline-flex',
        lineHeight: 1,
      },

      native: {
        alignSelf: 'flex-start',
      },
    },
  });

  const styleState = createStyle({
    type: 'component',
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

  const styles = [styleRoot, styleState, className];

  return (
    <TextFactory map={map} ref={ref} {...rest} className={styles}>
      {!dot && <Text>{value ?? children ?? '&nbsp;'}</Text>}
    </TextFactory>
  );
}

export default React.forwardRef(BadgeFactory);
