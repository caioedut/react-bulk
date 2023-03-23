import React, { forwardRef, useEffect } from 'react';

import useAnimation from '../../hooks/useAnimation';
import useTheme from '../../hooks/useTheme';
import Times from '../../icons/Times';
import factory2 from '../../props/factory2';
import { ActionSheetProps } from '../../types';
import global from '../../utils/global';
import BackdropFactory from '../BackdropFactory';
import ButtonFactory from '../ButtonFactory';
import CardFactory from '../CardFactory';

const ActionSheetFactory = React.memo<ActionSheetProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.ActionSheet;
    const { svg, useDimensions, Animated } = global.mapping;

    const dimensions = useDimensions();

    // Extends from default props
    let {
      contentInset,
      visible,
      // Events
      onClose,
      // Styles
      variants,
      ...rest
    } = factory2(props, options);

    const animation = useAnimation({ marginBottom: -dimensions.height });

    useEffect(() => {
      animation.start({ marginBottom: visible ? 0 : -dimensions.height });
    }, [visible]);

    return (
      <BackdropFactory visible={visible} justifyContent="end">
        <CardFactory ref={ref} component={Animated.View} stylist={[variants.root, stylist]} {...rest} rawStyle={animation.style}>
          <ButtonFactory variant="text" align="end" circular m={-1} mb={1} onPress={onClose}>
            <Times svg={svg} color={theme.color('primary')} />
          </ButtonFactory>

          {children}
        </CardFactory>
      </BackdropFactory>
    );
  }),
);

ActionSheetFactory.displayName = 'ActionSheetFactory';

export default ActionSheetFactory;
