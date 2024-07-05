import React, { forwardRef, useEffect } from 'react';

import useDefaultRef from '../hooks/useDefaultRef';
import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { BackdropProps } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';

const BackdropFactory = React.memo<BackdropProps>(
  forwardRef(({ children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Backdrop;
    const { web, native, Dialog } = global.mapping;

    // Extends from default props
    const {
      visible,
      // Events
      onPress,
      // Styles
      variants,
      containerStyle,
      ...rest
    } = factory2<BackdropProps>(props, options);

    const rootRef = useDefaultRef<any>(ref);

    useEffect(() => {
      if (!web) return;

      if (visible) {
        // @ts-ignore
        setTimeout(() => rootRef.current?.focus?.(), 100);

        const top = document.documentElement.scrollTop;
        const left = document.documentElement.scrollLeft;

        window.onscroll = () => window.scrollTo({ top, left, behavior: 'auto' });
      }

      return () => {
        window.onscroll = null;
      };
    }, [rootRef, visible, web]);

    const Child = (
      <BoxFactory ref={rootRef} variants={{ root: variants.root }} tabIndex="-1" {...rest}>
        <BoxFactory
          position="absolute"
          i={0}
          zIndex={0}
          accessibility={{
            label: 'close',
          }}
          style={{
            cursor: 'auto',
            web: { '& ~ *': { zIndex: 1 } },
          }}
          onPress={onPress}
        />
        {children}
      </BoxFactory>
    );

    return native ? (
      <Dialog
        transparent
        statusBarTranslucent
        visible={Boolean(visible)}
        animationType="fade"
        presentationStyle="overFullScreen"
      >
        {Child}
      </Dialog>
    ) : (
      <BoxFactory
        noRootStyles
        component={Dialog}
        style={[
          {
            position: 'fixed',
            inset: 0,
            cursor: 'auto !important',
            opacity: 0,
            visibility: 'hidden',
            zIndex: -1,
            ...theme.mixins.transitions.fast,
            transitionProperty: 'all',
          },
          visible && {
            opacity: 1,
            visibility: 'visible',
            zIndex: theme.mixins.zIndex.backdrop,
          },
        ]}
      >
        {Child}
      </BoxFactory>
    );
  }),
);

BackdropFactory.displayName = 'BackdropFactory';

export default BackdropFactory;
