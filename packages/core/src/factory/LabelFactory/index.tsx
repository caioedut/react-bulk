import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, LabelProps } from '../../types';
import useStylist from '../../useStylist';
import TextFactory from '../TextFactory';

function LabelFactory({ stylist, map, ...props }: FactoryProps & LabelProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Label;
  const { Label } = map;

  // Extends from default props
  let { for: htmlFor, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  stylist = [styleRoot, stylist];

  return <TextFactory map={map} ref={ref} component={Label} stylist={stylist} {...rest} htmlFor={htmlFor} />;
}

export default React.forwardRef(LabelFactory);
