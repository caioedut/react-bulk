import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { FactoryProps, RectType, SliderProps } from '../../types';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';

function SliderFactory({ stylist, map, ...props }: FactoryProps & SliderProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Slider;
  const { web, native, View } = map;

  // Extends from default props
  let {
    color,
    defaultValue,
    max,
    min,
    name,
    platform,
    size,
    value,
    // Events
    onChange,
    onSlide,
    // Styles
    variants,
    ...rest
  } = factory2(props, options, theme);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const dotRef = useRef(null);
  const barRef = useRef(null);

  const containerRectRef = useRef<RectType | null>(null);
  const dotIniPosRef = useRef<number | null>(null);
  const pressIniPosRef = useRef<number | null>(null);

  if (typeof size === 'string') {
    size = pick(size, 'medium', {
      xsmall: 0.625,
      small: 0.75,
      medium: 1,
      large: 1.25,
      xlarge: 1.625,
    });
  }

  const baseCalc = max - min;
  const iconSize = theme.rem(size);
  const ruleSize = iconSize / 4;

  defaultValue = Math.min(max, Math.max(min, defaultValue ?? min));
  const [percent, setPercent] = useState(Math.round((defaultValue * 100) / max));

  useImperativeHandle(ref, () => containerRef.current);

  useEffect(() => {
    if (!web) return;

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleRelease);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleRelease);
    };
  }, [handleMove]);

  function setStyles($el, styles = {}) {
    if (web) {
      for (let attr in styles) {
        const value = styles[attr];
        $el.style[attr] = value && !isNaN(value) ? `${value}px` : value;
      }
    }

    if (native) {
      $el.setNativeProps(styles);
    }
  }

  async function getRect($el): Promise<RectType> {
    if (web) {
      const { offsetLeft: offsetX, offsetTop: offsetY } = $el;
      const { width, height, left: pageOffsetX, top: pageOffsetY } = $el.getBoundingClientRect();
      return { width, height, offsetX, offsetY, pageOffsetX, pageOffsetY };
    }

    if (native) {
      return new Promise((resolve) =>
        $el.measure((offsetX, offsetY, width, height, pageOffsetX, pageOffsetY) =>
          resolve({ width, height, offsetX, offsetY, pageOffsetX, pageOffsetY }),
        ),
      );
    }

    return {} as RectType;
  }

  async function getState() {
    const $dot = dotRef.current;

    let percent;
    let value;

    if (containerRectRef.current) {
      const dotRect: RectType = await getRect($dot);
      const targetX = dotRect.pageOffsetX - containerRectRef.current.pageOffsetX;

      percent = (targetX / containerRectRef.current.width) * 100;
      value = Math.round((percent / 100) * baseCalc + min);

      percent = Math.round((value * 100) / baseCalc);
      percent = Math.min(percent, 100);
      percent = Math.max(percent, 0);
    }

    return { percent, value };
  }

  async function handlePress(e) {
    e.preventDefault();

    // @ts-ignore
    buttonRef?.current?.focus();

    const pageX = e?.pageX ?? e?.nativeEvent?.pageX;

    const $container = containerRef.current;
    const $dot = dotRef.current;
    const $bar = barRef.current;

    containerRectRef.current = await getRect($container);
    const targetX = pageX - containerRectRef.current.pageOffsetX;

    setStyles($dot, { marginLeft: targetX });
    setStyles($bar, { width: targetX });

    const dotRect = await getRect($dot);
    dotIniPosRef.current = dotRect.pageOffsetX as number;
    pressIniPosRef.current = pageX;
  }

  async function handleMove(e) {
    if (dotIniPosRef.current === null) return;

    e.preventDefault();

    const pageX = e?.pageX ?? e?.nativeEvent?.pageX;

    if (containerRectRef.current) {
      let targetX = pageX - containerRectRef.current.pageOffsetX;
      targetX = Math.min(targetX, containerRectRef.current.width);
      targetX = Math.max(targetX, 0);

      setStyles(dotRef.current, { marginLeft: targetX });
      setStyles(barRef.current, { width: targetX });

      if (typeof onSlide === 'function') {
        const { percent, value } = await getState();
        onSlide?.({}, value, percent);
      }
    }
  }

  async function handleRelease(e) {
    if (dotIniPosRef.current === null) return;

    e.preventDefault();

    const { percent, value } = await getState();

    // Reset styles
    setStyles(dotRef.current, { marginLeft: web ? '' : undefined });
    setStyles(barRef.current, { width: web ? '' : undefined });

    // Reset refs
    containerRectRef.current = null;
    pressIniPosRef.current = null;
    dotIniPosRef.current = null;

    // Set percent and call handlers
    setPercent(percent);
    onSlide?.({}, value, percent);
    onChange?.({}, value);
  }

  return (
    <BoxFactory
      map={map}
      ref={containerRef}
      {...rest}
      component={View}
      platform={{
        ...Object(platform),
        web: {
          ...Object(platform?.web),
          onPressIn: handlePress,
        },
        native: {
          ...Object(platform?.native),
          collapsable: false,
          onStartShouldSetResponder: () => true,
          onMoveShouldSetResponder: () => true,
          onResponderStart: handlePress,
          onResponderMove: handleMove,
          onResponderEnd: handleRelease,
        },
      }}
      style={{ height: iconSize }}
      stylist={[variants.root, stylist]}
    >
      {/* Full Width Rule */}
      <BoxFactory
        map={map}
        style={{
          borderRadius: ruleSize / 2,
          marginTop: -ruleSize / 2,
          height: ruleSize,
        }}
        stylist={[variants.rule]}
      />

      {/* Value Bar */}
      <BoxFactory
        map={map}
        ref={barRef}
        platform={{
          native: { collapsable: false },
        }}
        style={{
          backgroundColor: color,
          borderRadius: ruleSize / 2,
          marginTop: -ruleSize / 2,
          height: ruleSize,
          width: `${percent}%`,
        }}
        stylist={[variants.bar]}
      />

      <BoxFactory
        map={map}
        ref={dotRef}
        platform={{
          native: { collapsable: false },
        }}
        style={{
          position: 'relative',
          marginLeft: `${percent}%`,
          width: 1,
        }}
      >
        <ButtonFactory
          map={map}
          ref={buttonRef}
          style={{
            left: -iconSize / 2,
            backgroundColor: color,
            borderRadius: iconSize / 2,
            minHeight: 0,
            minWidth: 0,
            padding: 0,
            height: iconSize,
            width: iconSize,
          }}
          stylist={[variants.thumb]}
        />
      </BoxFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(SliderFactory);
