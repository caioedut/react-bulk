import React from 'react';

import { useTheme } from '../../ReactBulk';
import { FactoryProps, LoadingProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';

function LoadingFactory({ className, map, ...props }: FactoryProps | LoadingProps, ref: any) {
  const theme = useTheme();
  const { web } = map;
  const classes: any[] = ['rbk-loading', className];

  // Extends from default props
  props = { ...theme.components.Loading.defaultProps, ...props };

  let { color, label, size, speed, style, ...rest } = props;

  const multiplier = 1.25;
  size = size ?? theme.rem(multiplier);

  style = [
    web && {
      animation: `spin ${speed} linear infinite`,
    },

    style,
  ];

  return (
    <BoxFactory ref={ref} map={map} flexbox center {...rest} className={clsx(classes)} style={style}>
      <IconFactory map={map} name="Spinner" size={size} color={color} />
      {Boolean(label) && (
        <BoxFactory map={map} ml={size / 2} style={{ fontSize: size / multiplier }}>
          {label}
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(LoadingFactory);
