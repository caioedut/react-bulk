import React, { forwardRef, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { ProgressProps } from '../../types';
import global from '../../utils/global';
import pick from '../../utils/pick';
import AnimationFactory from '../AnimationFactory';
import BoxFactory from '../BoxFactory';

const ProgressFactory = React.memo<ProgressProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Progress;
    const { native } = global.mapping;

    // Extends from default props
    let {
      accessibility,
      color,
      size,
      value,
      // Events
      onLayout,
      // Styles
      variants,
      barStyle,
      ...rest
    } = factory2(props, options);

    const [containerWidth, setContainerWidth] = useState<number>(0);

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 0.25,
        small: 0.75,
        medium: 1.25,
        large: 1.75,
        xlarge: 1.25,
      });
    }

    const isIndeterminate = typeof value !== 'number';
    const height = theme.rem(size);
    const translateX = native ? containerWidth * 0.8 : 'calc(100% - 20%)';

    if (!isIndeterminate) {
      accessibility = accessibility ?? {};
      accessibility.label = accessibility.label ?? 'percentage';
      accessibility.value = accessibility?.value ?? {};
      accessibility.value.now = value;
    }

    barStyle = [
      {
        bg: color,
        height,
        width: isIndeterminate ? '20%' : `${value}%`,
      },
      barStyle,
    ];

    if (native) {
      Object.assign(rest, { onLayout: handleLayout });
    }

    function handleLayout(e: any) {
      setContainerWidth(e.nativeEvent.layout.width);
      onLayout?.(e);
    }

    return (
      <BoxFactory ref={ref} {...rest} accessibility={accessibility} stylist={[variants.root, stylist]}>
        {isIndeterminate ? (
          <AnimationFactory //
            in
            loop
            timing="linear"
            direction="alternate"
            from={{ transform: [{ translateX: 0 }] }}
            to={{ transform: [{ translateX }] }}
          >
            <BoxFactory style={barStyle} stylist={[variants.bar]} />
          </AnimationFactory>
        ) : (
          <BoxFactory style={barStyle} stylist={[variants.bar]} />
        )}
      </BoxFactory>
    );
  }),
);

ProgressFactory.displayName = 'ProgressFactory';

export default ProgressFactory;
