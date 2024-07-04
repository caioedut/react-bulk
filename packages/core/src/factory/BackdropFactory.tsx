import React, { forwardRef, useEffect, useRef } from 'react';

import createPortal from '../createPortal';
import setNativeStyle from '../element/setNativeStyle';
import useDefaultRef from '../hooks/useDefaultRef';
import useHtmlId from '../hooks/useHtmlId';
import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { BackdropProps } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';

const BackdropFactory = React.memo<BackdropProps>(
  forwardRef(({ children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Backdrop;
    const { web, native, BackHandler } = global.mapping;

    const portalId = useHtmlId();

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
    const dialogRef = useRef<any>();

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

    useEffect(() => {
      if (!native) return;
      if (!visible) return;
      if (typeof onPress !== 'function') return;

      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        // @ts-expect-error
        onPress?.();
        return true;
      });

      return () => {
        backHandler.remove();
      };
    }, [native, visible, onPress]);

    return createPortal(
      portalId,

      <BoxFactory
        noRootStyles
        ref={dialogRef}
        animation={{
          to: { opacity: visible ? 1 : 0 },
          onStart: () => {
            if (visible) {
              setNativeStyle(dialogRef.current, { zIndex: theme.mixins.zIndex.backdrop });
            }
          },
          onEnd: () => {
            if (!visible) {
              setNativeStyle(dialogRef.current, { zIndex: -1 });
            }
          },
        }}
        style={[
          {
            inset: 0,
            opacity: 0,
            zIndex: -1,
            pointerEvents: visible ? 'auto' : 'none',

            web: {
              position: 'fixed',
              cursor: 'auto !important',
            },

            native: {
              position: 'absolute',
            },
          },
        ]}
      >
        <BoxFactory ref={rootRef} variants={{ root: variants.root }} tabIndex={visible ? '1' : '-1'} {...rest}>
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
      </BoxFactory>,
    );
  }),
);

BackdropFactory.displayName = 'BackdropFactory';

export default BackdropFactory;
