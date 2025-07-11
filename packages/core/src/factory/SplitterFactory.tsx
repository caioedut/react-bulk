import React, { Fragment, forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';

import rect from '../element/rect';
import setNativeStyle from '../element/setNativeStyle';
import useDefaultRef from '../hooks/useDefaultRef';
import useDraggable from '../hooks/useDraggable';
import useTheme from '../hooks/useTheme';
import childrenize from '../props/childrenize';
import extract from '../props/extract';
import factory2 from '../props/factory2';
import get from '../props/get';
import { AnyObject, RbkPointerEvent, RbkStyle, SplitterProps } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';
import DividerFactory from './DividerFactory';

const SplitterFactory = React.memo<SplitterProps>(
  forwardRef(({ ref, children, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.Splitter;
    const { web } = global.mapping;

    // Extends from default props
    const {
      direction,
      // Styles
      variants,
      ...rest
    } = factory2<SplitterProps>(props, options);

    const rootRef = useDefaultRef(ref);
    const childrenRefs = useRef<any[]>([]);
    const currentChildRef = useRef({
      mult: 1,
      containerSize: 0,
      childSize: 0,
      x: 0,
      y: 0,
      $child: null,
    });

    const isVertical = useMemo(() => direction === 'vertical', [direction]);

    const { childArr, sizes } = useMemo(() => {
      const childArr = childrenize(children);

      const sizes = childArr.map(
        (child) =>
          (isVertical
            ? (get('height', child?.props) ??
              get('h', child?.props) ??
              get('height', child?.props?.style) ??
              get('h', child?.props?.style))
            : (get('width', child?.props) ??
              get('w', child?.props) ??
              get('width', child?.props?.style) ??
              get('w', child?.props?.style))) ?? 'auto',
      );

      return { childArr, sizes };
    }, [children, isVertical]);

    const { release, capture, isCapturing } = useDraggable({
      onDragMove: (event) => {
        event.preventDefault();

        const { $child, childSize, mult, x, y } = currentChildRef.current;

        const diff = isVertical ? (event.pageY - y) * mult : (event.pageX - x) * mult;

        setNativeStyle($child, {
          flexGrow: 0,
          flexBasis: Math.max(0, childSize + diff),
        });
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

    const handleInit = useCallback(
      async (event: RbkPointerEvent, index: number) => {
        let mult = 1;
        let $child = childrenRefs.current[index];

        if (sizes[index] === 'auto' && sizes[index + 1] !== 'auto') {
          mult = -1;
          $child = childrenRefs.current[index + 1];
        }

        const containerMetrics = await rect(rootRef.current);
        const childMetrics = await rect($child);

        currentChildRef.current = {
          mult,
          containerSize: isVertical ? containerMetrics.height : containerMetrics.width,
          childSize: isVertical ? childMetrics.height : childMetrics.width,
          x: event.pageX,
          y: event.pageY,
          $child,
        };

        capture();
      },
      [rootRef, isVertical, capture, sizes],
    );

    return (
      <BoxFactory ref={rootRef} variants={{ root: variants.root }} {...rest}>
        {childArr.map((child, index) => {
          const childProps: AnyObject = { ...child?.props };
          const childStyle: RbkStyle = childProps?.style;

          const extracted = extract(isVertical ? ['height', 'h'] : ['width', 'w'], childProps, childStyle);
          const size = (isVertical ? (extracted.height ?? extracted.h) : (extracted.width ?? extracted.w)) ?? 'auto';

          return (
            <Fragment key={child.key ?? index}>
              {index > 0 && (
                <BoxFactory
                  direction={isVertical ? 'column' : 'row'}
                  onPressIn={(e) => handleInit(e, index - 1)}
                  platform={{
                    native: {
                      hitSlop: { top: 16, bottom: 16, left: 16, right: 16 },
                    },
                  }}
                  style={
                    web && {
                      cursor: isVertical ? 'row-resize' : 'col-resize',
                      // #hack for hitSlop-like
                      margin: -4,
                      padding: 4,
                    }
                  }
                >
                  <DividerFactory
                    color={isCapturing ? 'info' : undefined}
                    opacity={isCapturing ? 1 : undefined}
                    vertical={!isVertical}
                  />
                </BoxFactory>
              )}

              <BoxFactory
                key={index}
                ref={($el) => {
                  childrenRefs.current[index] = $el;
                }}
                component={child?.type}
                {...childProps}
                style={[
                  childStyle,
                  {
                    flexGrow: size === 'auto' ? 1 : 0,
                    flexBasis: size === 'auto' ? 'auto' : size,
                  },
                ]}
                variants={{ root: variants.item }}
              />
            </Fragment>
          );
        })}
      </BoxFactory>
    );
  }),
);

SplitterFactory.displayName = 'SplitterFactory';

export default SplitterFactory;
