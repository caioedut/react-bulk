import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { LoadingProps } from '../../types';
import AnimationFactory from '../AnimationFactory';
import BoxFactory from '../BoxFactory';
import ProgressFactory from '../ProgressFactory';
import TextFactory from '../TextFactory';

const LoadingFactory = React.memo<LoadingProps>(
  forwardRef(({ stylist, ...props }, ref) => {
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
    const labelSize = size * 0.5625;

    labelStyle = [{ color, ml: size }, labelStyle];

    return (
      <BoxFactory ref={ref} stylist={[variants.root, stylist]} row center {...rest}>
        <AnimationFactory
          loop
          in
          speed={500}
          timing="linear"
          from={{ transform: [{ rotate: '0deg' }] }}
          to={{ transform: [{ rotate: '360deg' }] }}
        >
          <ProgressFactory size={size / 4} color={color} />
        </AnimationFactory>

        {Boolean(label) && (
          <TextFactory size={labelSize} style={labelStyle} stylist={[variants.label]}>
            {label}
          </TextFactory>
        )}
      </BoxFactory>
    );
  }),
);

LoadingFactory.displayName = 'LoadingFactory';

export default LoadingFactory;
