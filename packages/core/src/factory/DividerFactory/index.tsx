import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { DividerProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function DividerFactory({ stylist, map, innerRef, ...props }: FactoryProps & DividerProps) {
  const theme = useTheme();
  const options = theme.components.Divider;

  // Extends from default props
  let { color, opacity, size, vertical, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleSize = useStylist({
    style: vertical ? { alignSelf: 'stretch', width: 1 } : { height: 1 },
  });

  const styleState = useStylist({
    style: {
      backgroundColor: color,
      opacity,
    },
  });

  return <BoxFactory map={map} innerRef={innerRef} stylist={[styleRoot, styleSize, styleState, stylist]} {...rest} />;
}

export default React.memo(DividerFactory);
