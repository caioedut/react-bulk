import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

import rect from '../element/rect';
import setNativeStyle from '../element/setNativeStyle';
import useDefaultRef from '../hooks/useDefaultRef';
import useDraggable from '../hooks/useDraggable';
import useTheme from '../hooks/useTheme';
import Resize from '../icons/Resize';
import factory2 from '../props/factory2';
import { RbkPointerEvent, ResizableProps } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';

const ResizableFactory = React.memo<ResizableProps>(
  forwardRef(({ ref, children, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.Resizable;
    const { web, svg } = global.mapping;

    // Extends from default props
    let {
      horizontal,
      vertical,
      // Styles
      variants,
      ...rest
    } = factory2<ResizableProps>(props, options);

    const both = (horizontal && vertical) || (typeof horizontal === 'undefined' && typeof vertical === 'undefined');
    horizontal = horizontal ?? both;
    vertical = vertical ?? both;

    const rootRef = useDefaultRef<any>(ref);
    const metricsRef = useRef<any>();
    const initEventRef = useRef<any>();

    const { capture, release, isCapturing } = useDraggable({
      onDragMove: (event) => {
        if (horizontal) {
          setNativeStyle(rootRef.current, {
            width: metricsRef.current.width + (event.pageX - initEventRef.current.pageX),
          });
        }

        if (vertical) {
          setNativeStyle(rootRef.current, {
            height: metricsRef.current.height + (event.pageY - initEventRef.current.pageY),
          });
        }
      },
      onDragEnd: () => {
        release();
      },
    });

    useEffect(() => {
      if (!isCapturing) return;

      return () => {
        release();
      };
    }, [isCapturing, release]);

    const handleCapture = useCallback(
      async (event: RbkPointerEvent) => {
        initEventRef.current = event;
        metricsRef.current = await rect(rootRef.current);
        capture();
      },
      [rootRef, capture],
    );

    return (
      <BoxFactory ref={rootRef} variants={{ root: variants.root }} {...rest}>
        {children}

        <BoxFactory
          position="absolute"
          alignItems="end"
          justifyContent="end"
          r={0}
          b={0}
          h={24}
          w={24}
          onPressIn={handleCapture}
          style={[
            web && horizontal && { cursor: 'e-resize' },
            web && vertical && { cursor: 's-resize' },
            web && both && { cursor: 'se-resize' },
          ]}
        >
          <Resize svg={svg} color={theme.color(isCapturing ? 'info' : 'text')} />
        </BoxFactory>
      </BoxFactory>
    );
  }),
);

ResizableFactory.displayName = 'ResizableFactory';

export default ResizableFactory;
