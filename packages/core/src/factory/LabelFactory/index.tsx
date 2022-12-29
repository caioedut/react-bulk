import React, { forwardRef, useEffect, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { LabelProps } from '../../types';
import global from '../../utils/global';
import TextFactory from '../TextFactory';

const LabelFactory = React.memo<LabelProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Label;
    const { web, native, Label } = global.mapping;

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

    return <TextFactory ref={ref} component={Label} stylist={[variants.root, stylist]} {...rest} {...focusProps} />;
  }),
);

LabelFactory.displayName = 'LabelFactory';

export default LabelFactory;
