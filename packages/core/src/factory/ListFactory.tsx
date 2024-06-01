import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import rect from '../element/rect';
import useDefaultRef from '../hooks/useDefaultRef';
import useTheme from '../hooks/useTheme';
import childrenize from '../props/childrenize';
import factory2 from '../props/factory2';
import get from '../props/get';
import { ListProps } from '../types';
import global from '../utils/global';
import sleep from '../utils/sleep';
import ScrollableFactory from './ScrollableFactory';

const ListFactory = React.memo<ListProps>(
  forwardRef(({ children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.List;
    const { web, native, View } = global.mapping;

    // Extends from default props
    const {
      direction,
      renderDelay,
      renderOffset,
      rowHeight,
      rowWidth,
      rowFallbackComponent = View,
      // Events
      onScroll,
      // Styles
      variants,
      ...rest
    } = factory2<ListProps>(props, options);

    const scrollRef = useDefaultRef<any>(ref);
    const offsetTopRef = useRef(0);
    const offsetLeftRef = useRef(0);
    const childrenArray = useMemo(() => childrenize(children), [children]);

    const [sticky, setSticky] = useState<number[]>([]);
    const [visible, setVisible] = useState<number[]>([]);

    if (native) {
      rest.stickyHeaderIndices = sticky;
    }

    const render = useCallback(
      ({ clientHeight = 0, clientWidth, offsetTop = 0, offsetLeft = 0 }) => {
        const newVisible: typeof visible = [];
        const newSticky: typeof sticky = [];

        let curPosX = 0;
        let curPosY = 0;

        for (const index in childrenArray) {
          const child = childrenArray[index];
          const width = child?.props?.width ?? rowWidth ?? 0;
          const height = child?.props?.height ?? rowHeight ?? 0;

          if (direction === 'vertical') {
            curPosY += height;
            const minPosY = offsetTop - height - (renderOffset ?? 0);
            const maxPosY = clientHeight + offsetTop + height + (renderOffset ?? 0);

            if (curPosY >= minPosY && curPosY <= maxPosY) {
              newVisible.push(Number(index));
            }
          }

          if (direction === 'horizontal') {
            curPosX += width;
            const minPosX = offsetLeft - width - (renderOffset ?? 0);
            const maxPosX = clientWidth + offsetLeft + width + (renderOffset ?? 0);

            if (curPosX >= minPosX && curPosX <= maxPosX) {
              newVisible.push(Number(index));
            }
          }

          if (child?.props?.sticky || get('position', child?.props, child?.props?.style) === 'sticky') {
            newSticky.push(Number(index));
          }
        }

        setVisible(newVisible);
        setSticky(newSticky);
      },
      [childrenArray, rowHeight, rowWidth, renderOffset],
    );

    useEffect(() => {
      if (!scrollRef.current) return;

      (async () => {
        await sleep(renderDelay ?? 0);

        const { width, height } = await rect(scrollRef.current);

        render({
          clientHeight: height,
          clientWidth: width,
          offsetTop: offsetTopRef.current,
          offsetLeft: offsetLeftRef.current,
        });
      })();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollRef, childrenArray]);

    const handleScroll = useCallback(
      (event) => {
        const { target, nativeEvent } = event;

        const clientWidth = target?.clientWidth ?? nativeEvent?.layoutMeasurement?.width ?? 0;
        const clientHeight = target?.clientHeight ?? nativeEvent?.layoutMeasurement?.height ?? 0;

        const offsetTop = target?.scrollTop ?? nativeEvent?.contentOffset?.y ?? 0;
        const offsetLeft = target?.scrollLeft ?? nativeEvent?.contentOffset?.x ?? 0;

        offsetTopRef.current = offsetTop;
        offsetLeftRef.current = offsetLeft;

        render({ clientHeight, clientWidth, offsetTop, offsetLeft });

        onScroll?.(event);
      },
      [render, onScroll],
    );

    return (
      <ScrollableFactory
        ref={scrollRef}
        variants={{ root: variants.root }}
        direction={direction}
        {...rest}
        onScroll={handleScroll}
      >
        {childrenArray.map((child, index) => {
          const isVisible = visible.includes(index);
          const isSticky = sticky.includes(index);

          if ((isVisible || isSticky) && isValidElement(child)) {
            return cloneElement(child, {
              key: index,
              // @ts-expect-error
              sticky: undefined,
              position: undefined,
              ...(web && isSticky ? { position: 'sticky', top: 0 } : {}),
            });
          }

          const Component = rowFallbackComponent;
          const ref = (child as any)?.ref;
          const height = child?.props?.height ?? rowHeight;
          const width = child?.props?.width ?? rowWidth;

          return <Component key={index} ref={ref} style={{ height, width }} />;
        })}
      </ScrollableFactory>
    );
  }),
);

ListFactory.displayName = 'ListFactory';

export default ListFactory;
