import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import rect from '../../element/rect';
import scrollTo from '../../element/scrollTo';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { CarouselProps, FactoryProps } from '../../types';
import event from '../../utils/event';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import ScrollableFactory from '../ScrollableFactory';

function CarouselFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & CarouselProps) {
  const theme = useTheme();
  const options = theme.components.Carousel;
  const { web, native } = map;

  // Extends from default props
  let {
    chevron,
    gap,
    swipe,
    // Column Count
    xs,
    sm,
    md,
    lg,
    xl,
    // Styles
    variants,
    chevronStyle,
    ...rest
  } = factory2(props, options);

  const contentRef = useRef<any>(null);
  const itemRef = useRef<any>(null);
  const offsetRef = useRef(0);

  const hasChevron = chevron !== 'hidden';
  chevron = native && hasChevron ? 'visible' : chevron;

  // const [dragging, setDragging] = useState(false);
  const [contentWidth, setContentWidth] = useState<number | null>(null);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [showChevron, setShowChevron] = useState(hasChevron);
  // const [paused, setPaused] = useState(true);

  const scrollByCount = useCallback(
    async (count) => {
      let width = contentWidth ?? 0;

      if (web) {
        width = (await rect(itemRef.current)).width;
      }

      scrollTo(contentRef.current, count * width + offsetRef.current);
    },
    [contentWidth],
  );

  const scrollToPrev = () => {
    scrollByCount(-1).catch(() => null);
  };

  const scrollToNext = () => {
    scrollByCount(1).catch(() => null);
  };

  const handleScroll = useCallback(
    (e?: any) => {
      let scrollLeft = 0;
      let scrollOverflowWidth = 0;

      if (web) {
        const $target = contentRef.current;
        scrollLeft = $target.scrollLeft;
        scrollOverflowWidth = $target.scrollWidth - $target.clientWidth;
      }

      if (native) {
        const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
        scrollLeft = contentOffset.x;
        scrollOverflowWidth = contentSize.width - layoutMeasurement.width;
      }

      offsetRef.current = scrollLeft;

      setHasPrev(scrollLeft > 0);
      setHasNext(scrollOverflowWidth !== scrollLeft);
    },
    [contentRef],
  );

  useLayoutEffect(() => {
    if (!web || !contentRef.current) return;
    setContentWidth(contentRef.current.clientWidth);
  }, []);

  useEffect(() => {
    if (!contentRef.current || !contentWidth) return;
    scrollTo(contentRef.current, 10, 10, false);
    scrollTo(contentRef.current, 0, 0, false);
  }, [contentRef, contentWidth]);

  useEffect(() => {
    if (!web || !contentRef.current) return;

    return event(contentRef.current, 'wheel', (e) => {
      if (e.deltaY > 0 && hasNext) {
        e.preventDefault();
        scrollToNext();
      }

      if (e.deltaY <= 0 && hasPrev) {
        e.preventDefault();
        scrollToPrev();
      }
    });
  }, [contentRef, hasPrev, hasNext]);

  if (web && chevron === 'auto') {
    Object.assign(rest, {
      onPointerOver: () => setShowChevron(true),
      onPointerOut: () => setShowChevron(false),
    });
  }

  if (native) {
    Object.assign(rest, {
      onLayout: ({ nativeEvent }) => setContentWidth(nativeEvent.layout.width),
    });
  }

  const base = contentWidth ?? 100;
  const itemStyle = {
    xs: { width: base / xs },
    sm: { width: base / (sm ?? xs) },
    md: { width: base / (md ?? sm ?? xs) },
    lg: { width: base / (lg ?? md ?? sm ?? xs) },
    xl: { width: base / (xl ?? lg ?? md ?? sm ?? xs) },
  };

  chevronStyle = [{ mt: -4, transform: [{ scale: 3 }] }, chevronStyle];

  return (
    <BoxFactory map={map} innerRef={innerRef} stylist={[variants.root, stylist]} {...rest}>
      <ScrollableFactory
        map={map}
        innerRef={contentRef}
        stylist={[variants.content]}
        pagingEnabled
        hideScrollBar
        direction="horizontal"
        onScroll={handleScroll}
      >
        {contentWidth !== null && (
          <BoxFactory map={map} row noWrap>
            {React.Children.map(children, (child, index) => (
              <BoxFactory key={index} map={map} innerRef={itemRef} style={itemStyle} pl={index ? gap : 0}>
                {child}
              </BoxFactory>
            ))}
          </BoxFactory>
        )}
      </ScrollableFactory>

      {hasChevron && hasPrev && (
        <BoxFactory map={map} l={0} invisible={!showChevron} stylist={[variants.chevron]}>
          <ButtonFactory map={map} variant="text" size="large" circular labelStyle={chevronStyle} onClick={scrollToPrev}>
            ‹
          </ButtonFactory>
        </BoxFactory>
      )}

      {hasChevron && hasNext && (
        <BoxFactory map={map} r={0} invisible={!showChevron} stylist={[variants.chevron]}>
          <ButtonFactory map={map} variant="text" size="large" circular labelStyle={chevronStyle} onClick={scrollToNext}>
            ›
          </ButtonFactory>
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.memo(CarouselFactory);