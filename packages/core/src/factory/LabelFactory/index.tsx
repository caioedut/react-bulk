import React, { forwardRef } from 'react';

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
      // Events
      onPress,
      ...rest
    } = factory2(props, options);

    if (web && forProp) {
      Object.assign(rest, {
        htmlFor: typeof forProp === 'string' ? forProp : forProp?.current?.id,
      });
    }

    if (native && !onPress) {
      onPress = forProp?.current?.focus;
    }

    return <TextFactory ref={ref} component={Label} stylist={[variants.root, stylist]} {...rest} onPress={onPress} />;
  }),
);

LabelFactory.displayName = 'LabelFactory';

export default LabelFactory;
