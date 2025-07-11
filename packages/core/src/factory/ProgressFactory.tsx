import React, { forwardRef, useState } from 'react';

import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { ProgressProps, RequiredSome } from '../types';
import deepmerge from '../utils/deepmerge';
import rbkGlobal from '../utils/global';
import pick from '../utils/pick';
import BoxFactory from './BoxFactory';
import TextFactory from './TextFactory';

const ProgressFactory = React.memo<ProgressProps>(
  forwardRef(({ ref, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.Progress;
    const { native } = rbkGlobal.mapping;

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
      style,
      barStyle,
      labelStyle,
      ...rest
    } = factory2<RequiredSome<ProgressProps, 'color' | 'label' | 'size'>>(props, options);

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

    const fontSize = theme.rem((size as number) * 0.7);
    const isIndeterminate = typeof value !== 'number';
    const height = theme.rem(size as number);
    const translateX = native ? containerWidth * 0.8 : '80%';

    if (!isIndeterminate) {
      // fix float precision
      // Exception in HostFunction: Loss of precision during arithmetic conversion: (long long)
      value = Math.round(value ?? 0);

      rest.accessibility = deepmerge({ label: 'percentage' }, rest.accessibility, { value: { now: value } });
    }

    style = [
      {
        corners: (size as number) * 2,
      },

      style,
    ];

    barStyle = [
      {
        bg: color,
        height,
        width: 0,
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
      <BoxFactory ref={ref} {...rest} style={style} variants={{ root: variants.root }}>
        {isIndeterminate ? (
          <BoxFactory
            animation={{
              throttle: 0,
              duration: 500,
              timing: 'linear',
              boomerang: true,
              iterations: 'infinite',
              from: { transform: { translateX: 0 } },
              to: { transform: { translateX } },
            }}
          >
            <BoxFactory w="20%" style={barStyle} variants={{ root: variants.bar }} />
          </BoxFactory>
        ) : (
          <>
            <BoxFactory
              style={barStyle}
              variants={{ root: variants.bar }}
              animation={{
                throttle: 0,
                duration: 100,
                timing: 'linear',
                iterations: 1,
                to: { width: `${value}%` },
              }}
            />

            {Boolean(label) && (
              <BoxFactory position="absolute" i={0} center>
                {typeof label === 'function' ? (
                  label?.(value as number)
                ) : (
                  <TextFactory style={[{ fontSize }, labelStyle]} variants={{ root: variants.label }}>
                    {Math.round(value as number)}%
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
