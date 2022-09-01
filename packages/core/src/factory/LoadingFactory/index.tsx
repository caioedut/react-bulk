import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, LoadingProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';

function LoadingFactory({ className, map, ...props }: FactoryProps | LoadingProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Loading;
  const { web } = map;

  // Extends from default props
  let { color, label, size, speed, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const multiplier = 1.25;
  size = size ?? theme.rem(multiplier);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleState = useStylist({
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
