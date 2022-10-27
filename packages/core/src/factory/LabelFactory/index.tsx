import React, { useEffect, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FactoryProps, LabelProps } from '../../types';
import TextFactory from '../TextFactory';

function LabelFactory({ stylist, map, innerRef, ...props }: FactoryProps & LabelProps) {
  const theme = useTheme();
  const options = theme.components.Label;
  const { web, native, Label } = map;

  // Extends from default props
  let {
    for: forProp,
    platform,
    // Styles
    variants,
    ...rest
  } = factory2(props, options);

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

  return <TextFactory map={map} innerRef={innerRef} component={Label} stylist={[variants.root, stylist]} {...rest} {...focusProps} />;
}

export default React.memo(LabelFactory);
