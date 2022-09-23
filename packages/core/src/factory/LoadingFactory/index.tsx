import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, LoadingProps } from '../../types';
import useStylist from '../../useStylist';
import AnimationFactory from '../AnimationFactory';
import BoxFactory from '../BoxFactory';
import IconFactory from '../IconFactory';
import TextFactory from '../TextFactory';

function LoadingFactory({ stylist, map, ...props }: FactoryProps | LoadingProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Loading;

  // Extends from default props
  let { color, label, size, speed, ...rest } = factory(props, options.defaultProps);

  size = size ?? 1;

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleLabel = useStylist({
    name: options.name + '-label',
    style: options.defaultStyles.label,
  });

  const styleLabelState = useStylist({
    style: {
      color,
      ml: size,
    },
  });

  return (
    <BoxFactory ref={ref} map={map} stylist={[styleRoot, stylist]} row center {...rest}>
      <AnimationFactory
        map={map}
        loop
        in
        speed={1000}
        from={{ transform: [{ rotate: '0deg' }] }}
        to={{ transform: [{ rotate: '360deg' }] }}
      >
        <IconFactory map={map} name="Spinner" size={size} color={color} />
      </AnimationFactory>
      {Boolean(label) && (
        <TextFactory map={map} size={size} stylist={[styleLabel, styleLabelState]}>
          {label}
        </TextFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(LoadingFactory);
