import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, LoadingProps } from '../../types';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';

function LoadingFactory({ className, map, ...props }: FactoryProps | LoadingProps, ref: any) {
  const theme = useTheme();
  const { web } = map;

  // Extends from default props
  props = { ...theme.components.Loading.defaultProps, ...props };

  let { color, label, size, speed, ...rest } = props;

  const multiplier = 1.25;
  size = size ?? theme.rem(multiplier);

  const styleRoot = createStyle({
    name: 'rbk-loading',
    type: 'component',
    style: null,
  });

  const styleState = createStyle({
    type: 'component',
    style: web && {
      animation: `spin ${speed} linear infinite`,
    },
  });

  const styles = [styleRoot, styleState, className];

  return (
    <BoxFactory ref={ref} map={map} flexbox center {...rest} className={styles}>
      <IconFactory map={map} name="Spinner" size={size} color={color} />
      {Boolean(label) && (
        <BoxFactory map={map} style={{ color, fontSize: size / multiplier, marginLeft: size / 2 }}>
          {label}
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(LoadingFactory);
