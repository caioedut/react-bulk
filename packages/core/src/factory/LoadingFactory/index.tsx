import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FactoryProps, LoadingProps } from '../../types';
import AnimationFactory from '../AnimationFactory';
import BoxFactory from '../BoxFactory';
import ProgressFactory from '../ProgressFactory';
import TextFactory from '../TextFactory';

function LoadingFactory({ stylist, map, innerRef, ...props }: FactoryProps | LoadingProps) {
  const theme = useTheme();
  const options = theme.components.Loading;

  // Extends from default props
  let {
    color,
    label,
    size,
    speed,
    // Styles,
    variants,
    labelStyle,
    ...rest
  } = factory2(props, options);

  size = size ?? options.defaultProps.size;

  labelStyle = [{ color, ml: size }, labelStyle];

  return (
    <BoxFactory innerRef={innerRef} map={map} stylist={[variants.root, stylist]} row center {...rest}>
      <AnimationFactory map={map} loop in speed={500} from={{ transform: [{ rotate: '0deg' }] }} to={{ transform: [{ rotate: '360deg' }] }}>
        <ProgressFactory map={map} size={size / 4} color={color} />
      </AnimationFactory>
      {Boolean(label) && (
        <TextFactory map={map} size={size} style={labelStyle} stylist={[variants.label]}>
          {label}
        </TextFactory>
      )}
    </BoxFactory>
  );
}

export default React.memo(LoadingFactory);
