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
      forRef,
      platform,
      // Styles
      variants,
      // Events
      onPress,
      ...rest
    } = factory2<LabelProps>(props, options);

    if (web && forProp) {
      Object.assign(rest, {
        // @ts-expect-error
        htmlFor: forProp ?? forRef?.current?.id,
      });
    }

    if (native && !onPress) {
      // @ts-expect-error
      onPress = forRef?.current?.focus;
    }

    return <TextFactory ref={ref} component={Label} stylist={[variants.root, stylist]} {...rest} onPress={onPress} />;
  }),
);

LabelFactory.displayName = 'LabelFactory';

export default LabelFactory;
