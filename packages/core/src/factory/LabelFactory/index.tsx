import React, { useEffect, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, LabelProps } from '../../types';
import useStylist from '../../useStylist';
import TextFactory from '../TextFactory';

function LabelFactory({ stylist, map, ...props }: FactoryProps & LabelProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Label;
  const { web, native, Label } = map;

  // Extends from default props
  let { for: forProp, platform, ...rest } = factory(props, options.defaultProps);

  const [focusProps, setFocusProps] = useState({});

  useEffect(() => {
    if (web && forProp) {
      setFocusProps({
        htmlFor: typeof forProp === 'string' ? forProp : forProp?.current?.id,
      });
    }

    if (native && forProp?.current?.focus) {
      setFocusProps({
        platform: {
          ...platform,
          native: { ...platform?.native, onPress: forProp.current.focus },
        },
      });
    }
  }, [forProp, platform]);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  stylist = [styleRoot, stylist];

  return <TextFactory map={map} ref={ref} component={Label} stylist={stylist} {...rest} {...focusProps} />;
}

export default React.forwardRef(LabelFactory);
