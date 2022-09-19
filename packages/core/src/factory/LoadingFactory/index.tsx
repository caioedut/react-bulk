import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, LoadingProps } from '../../types';
import useStylist from '../../useStylist';
import AnimationFactory from '../AnimationFactory';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';

function LoadingFactory({ stylist, map, ...props }: FactoryProps | LoadingProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Loading;

  // Extends from default props
  let { color, label, size, speed, ...rest } = factory(props, options.defaultProps);

  const multiplier = size ?? theme.typography.lineHeight;

  size = theme.rem(multiplier);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  return (
    <BoxFactory ref={ref} map={map} stylist={[styleRoot, stylist]} row center {...rest}>
      <AnimationFactory map={map} loop in from={{ transform: [{ rotate: '0deg' }] }} to={{ transform: [{ rotate: '360deg' }] }}>
        <IconFactory map={map} name="Spinner" size={multiplier} color={color} />
      </AnimationFactory>
      {Boolean(label) && (
        <BoxFactory map={map} style={{ color, fontSize: size, marginLeft: size / 2 }}>
          {label}
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(LoadingFactory);
