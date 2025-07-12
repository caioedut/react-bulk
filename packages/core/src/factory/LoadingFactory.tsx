import React, { forwardRef } from 'react';

import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { LoadingProps, RequiredSome } from '../types';
import rbkGlobal from '../utils/global';
import pick from '../utils/pick';
import BoxFactory from './BoxFactory';
import TextFactory from './TextFactory';

const LoadingFactory = React.memo<LoadingProps>(
  forwardRef(({ ref, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.Loading;
    const { Svg, Circle } = rbkGlobal.mapping.svg;

    // Extends from default props
    let {
      duration,
      color,
      label,
      size,
      // Styles,
      variants,
      labelStyle,
      ...rest
    } = factory2<RequiredSome<LoadingProps, 'color' | 'size'>>(props, options);

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 0.25,
        small: 0.75,
        medium: 1.25,
        large: 1.75,
        xlarge: 1.25,
      });
    }

    color = theme.color(color ?? 'primary');
    size = size ?? options.defaultProps.size ?? 1;

    const fontSize = theme.rem((size as number) - 0.25);
    const base = theme.rem(size as number);
    const c = base / 2;
    const w = c / 4;
    const r = c - w / 2;

    labelStyle = [
      {
        color,
        fontSize,
        ml: (size as number) * 1.6,
      },
      labelStyle,
    ];

    return (
      <BoxFactory ref={ref} variants={{ root: variants.root }} {...rest}>
        <BoxFactory
          animation={{
            throttle: 0,
            duration,
            timing: 'linear',
            iterations: 'infinite',
            from: { rotate: '0deg' },
            to: { rotate: '360deg' },
          }}
        >
          <Svg viewBox={`0 0 ${base} ${base}`} height={base} width={base}>
            <Circle //
              cx={c}
              cy={c}
              fill="none"
              r={r}
              stroke={color}
              strokeWidth={w}
              strokeOpacity={0.2}
            />
            <Circle //
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={w}
              strokeDasharray={base * 2.5}
              strokeDashoffset={base * 1.875}
            />
          </Svg>
        </BoxFactory>

        {Boolean(label) && (
          <TextFactory style={labelStyle} variants={{ root: variants.label }}>
            {label}
          </TextFactory>
        )}
      </BoxFactory>
    );
  }),
);

LoadingFactory.displayName = 'LoadingFactory';

export default LoadingFactory;
