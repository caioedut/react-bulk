import React, { RefObject, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import getFullHeight from '../element/getFullHeight';
import rect from '../element/rect';
import setNativeStyle from '../element/setNativeStyle';
import useAnimation from '../hooks/useAnimation';
import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { CollapseProps } from '../types';
import rbkGlobal from '../utils/global';
import BoxFactory from './BoxFactory';

const CollapseFactory = React.memo<CollapseProps>(
  forwardRef(({ ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Collapse;
    const { web, native } = rbkGlobal.mapping;

    // Extends from default props
    const {
      delay,
      duration,
      timing,
      visible,
      trigger,
      // Styles
      variants,
      ...rest
    } = factory2<CollapseProps>(props, options);

    // Internal state, only used when "trigger" is provided (uncontrolled mode)
    const [open, setOpen] = useState(!!visible);
    const isVisible = trigger ? open : visible;

    const defaultRef: any = useRef();
    const rootRef: RefObject<any> = ref || defaultRef;

    const transition = useAnimation({}, rootRef);

    const initialStyle = useMemo(
      () => ({
        height: isVisible ? 'auto' : 0,
        overflow: isVisible ? 'visible' : 'hidden',
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    useEffect(() => {
      if (!rootRef.current) return;

      (async () => {
        const newSize = isVisible ? await getFullHeight(rootRef.current) : 0;
        const metrics = await rect(rootRef.current);

        if (newSize === metrics.height) {
          // getFullHeight restores the measured height in pixels, so release it back to "auto"
          if (newSize > 0) {
            setNativeStyle(rootRef.current, {
              height: 'auto',
              overflow: 'visible',
            });
          }

          return;
        }

        setNativeStyle(rootRef.current, {
          overflow: 'hidden',
        });

        await transition.start({
          throttle: 0,
          delay,
          timing,
          duration,
          web_useRawStyle: true,
          // Start from the measured height: after expanding it is "auto" and the content may have changed since
          from: { height: metrics.height },
          to: { height: newSize },
          end: newSize > 0 ? { height: 'auto', overflow: 'visible' } : { height: 0, overflow: 'hidden' },
        });
      })();

      // cannot add "transition" to dependencies
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootRef, isVisible, delay, timing, duration, web, native]);

    const collapse = (
      <BoxFactory
        noRootStyles
        {...transition.props}
        platform={{ native: { collapsable: false } }}
        style={initialStyle}
        variants={{ root: variants.root }}
        rawStyle={transition.props.style}
      >
        <BoxFactory {...rest} />
      </BoxFactory>
    );

    if (!trigger) {
      return collapse;
    }

    // The trigger receives "onPress" to toggle the content, and decides where and how to use it
    return (
      <>
        {trigger({ onPress: () => setOpen((state) => !state), visible: open })}
        {collapse}
      </>
    );
  }),
);

CollapseFactory.displayName = 'CollapseFactory';

export default CollapseFactory;
