import React, { RefObject, forwardRef, useEffect, useMemo, useRef } from 'react';

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
  forwardRef(({ ref, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.Collapse;
    const { web, native } = rbkGlobal.mapping;

    // Extends from default props
    const {
      delay,
      duration,
      timing,
      visible,
      // Styles
      variants,
      ...rest
    } = factory2<CollapseProps>(props, options);

    const defaultRef: any = useRef();
    const rootRef: RefObject<any> = ref || defaultRef;

    const transition = useAnimation({}, rootRef);

    const initialStyle = useMemo(
      () => ({
        height: visible ? 'auto' : 0,
        overflow: visible ? 'visible' : 'hidden',
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    useEffect(() => {
      if (!rootRef.current) return;

      (async () => {
        const newSize = visible ? await getFullHeight(rootRef.current) : 0;
        const metrics = await rect(rootRef.current);

        if (newSize === metrics.height) return;

        setNativeStyle(rootRef.current, {
          overflow: 'hidden',
        });

        await transition.start({
          throttle: 0,
          delay,
          timing,
          duration,
          web_useRawStyle: true,
          to: { height: newSize },
        });

        if (newSize > 0) {
          setNativeStyle(rootRef.current, {
            height: 'auto',
            overflow: 'visible',
          });
        }
      })();

      // cannot add "transition" to dependencies
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootRef, visible, delay, timing, duration, web, native]);

    return (
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
  }),
);

CollapseFactory.displayName = 'CollapseFactory';

export default CollapseFactory;
