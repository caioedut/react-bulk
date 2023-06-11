import React, { forwardRef, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { ProgressProps } from '../../types';
import deepmerge from '../../utils/deepmerge';
import global from '../../utils/global';
import pick from '../../utils/pick';
import AnimationFactory from '../AnimationFactory';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

const ProgressFactory = React.memo<ProgressProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Progress;
    const { native } = global.mapping;

    // Extends from default props
    let {
      color,
      label,
      size,
      value,
      // Events
      onLayout,
      // Styles
      variants,
      barStyle,
      labelStyle,
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

    const fontSize = theme.rem(size * 0.7);
    const isIndeterminate = typeof value !== 'number';
    const height = theme.rem(size);
    const translateX = native ? containerWidth * 0.8 : 'calc(100% - 20%)';

    if (!isIndeterminate) {
      rest.accessibility = deepmerge({ label: 'percentage' }, rest.accessibility, { value: { now: value } });
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
      <BoxFactory ref={ref} {...rest} stylist={[variants.root, stylist]}>
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
          <>
            <BoxFactory style={barStyle} stylist={[variants.bar]} />

            {Boolean(label) && (
              <BoxFactory position="absolute" i={0} center>
                {typeof label === 'function' ? (
                  label?.(value)
                ) : (
                  <TextFactory style={[{ fontSize }, labelStyle]} stylist={[variants.label]}>
                    {Math.round(value)}%
                  </TextFactory>
                )}
              </BoxFactory>
            )}
          </>
        )}
      </BoxFactory>
    );
  }),
);

ProgressFactory.displayName = 'ProgressFactory';

export default ProgressFactory;
