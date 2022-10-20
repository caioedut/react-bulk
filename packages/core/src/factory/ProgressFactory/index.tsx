import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, ProgressProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function ProgressFactory({ stylist, map, innerRef, ...props }: FactoryProps & ProgressProps) {
  const theme = useTheme();
  const options = theme.components.Progress;
  const { Svg, Circle } = map.svg;

  // Extends from default props
  let { color, size, ...rest } = factory(props, options.defaultProps);

  color = theme.color(color);

  const base = size * theme.typography.fontSize + theme.typography.fontSize;
  const c = base / 2;
  const w = c / 4;
  const r = c - w / 2;

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleSize = useStylist({
    style: {
      height: base,
      width: base,
    },
  });

  return (
    <BoxFactory map={map} innerRef={innerRef} stylist={[styleRoot, styleSize, stylist]} {...rest}>
      <Svg viewBox={`0 0 ${base} ${base}`} height="100%" width="100%">
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
  );
}

export default React.memo(ProgressFactory);
