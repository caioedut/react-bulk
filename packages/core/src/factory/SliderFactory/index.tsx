import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { FactoryProps, RectType, SliderProps } from '../../types';
import useHtmlId from '../../useHtmlId';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import { useForm } from '../FormFactory';
import TooltipFactory from '../TooltipFactory';

function SliderFactory({ stylist, map, ...props }: FactoryProps & SliderProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Slider;
  const { web, native, Input, View } = map;

  // Extends from default props
  let {
    color,
    defaultValue,
    disabled,
    id,
    max,
    min,
    name,
    platform,
    readOnly,
    size,
    value,
    // Events
    onChange,
    onSlide,
    // Styles
    variants,
    ...rest
  } = factory2(props, options, theme);

  id = useHtmlId(id);

  const form = useForm();

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

  const step = 1;
  const iconSize = theme.rem(size);
  const ruleSize = iconSize / 4;

  const ThumbFactory = web ? ButtonFactory : BoxFactory;

  defaultValue = Math.min(max, Math.max(min, defaultValue ?? min));
  const [percent, setPercent] = useState(getPercentByValue(defaultValue));
  const [tooltip, setTooltip] = useState<number | null>(null);
  const internal = getValueByPercent(percent);

  if (!disabled && !readOnly) {
    if (web) {
      Object.assign(rest, {
        onPressIn: handlePress,
      });
    }

    if (native) {
      Object.assign(rest, {
        collapsable: false,
        onStartShouldSetResponder: () => true,
        onMoveShouldSetResponder: () => true,
        onResponderStart: handlePress,
        onResponderMove: handleMove,
        onResponderEnd: handleRelease,
      });
    }
  }

  useImperativeHandle(ref, () => containerRef.current);

  useEffect(() => {
    if (!name || !form) return;

    form.setField({
      name,
      set: (value) => setPercent(getPercentByValue(value)),
      get: () => getValueByPercent(percent),
    });

    return () => {
      form.unsetField(name);
    };
  }, [name, form, getPercentByValue, getValueByPercent]);

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

  function getValueByPercent(percent) {
    const value = Math.round((percent / 100) * max);
    return Math.min(max, Math.max(min, value));
  }

  function getPercentByValue(value) {
    const percent = Math.round(((value - min) * 100) / (max - min));
    return Math.min(100, Math.max(0, percent));
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
      value = getValueByPercent(percent);
      percent = getPercentByValue(value);
    }

    return { percent, value };
  }

  async function handlePress(e) {
    e.preventDefault();

    if (web && buttonRef.current) {
      // @ts-ignore
      buttonRef.current.focus?.();
    }

    const pageX = e?.pageX ?? e?.nativeEvent?.pageX;

    const $container = containerRef.current;
    const $dot = dotRef.current;
    const $bar = barRef.current;

    containerRectRef.current = await getRect($container);
    const targetX = pageX - containerRectRef.current.pageOffsetX;

    setStyles($dot, { marginLeft: targetX });
    setStyles($bar, { width: targetX });

    const percent = (targetX / containerRectRef.current.width) * 100;
    setTooltip(getValueByPercent(percent));

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

      const percent = (targetX / containerRectRef.current.width) * 100;
      setTooltip(getValueByPercent(percent));

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

    if (native) {
      setTooltip(null);
    }

    // Reset refs
    containerRectRef.current = null;
    pressIniPosRef.current = null;
    dotIniPosRef.current = null;

    // Set percent and call handlers
    setPercent(percent);
    onSlide?.({}, value, percent);
    onChange?.({}, value);
  }

  const handleKeyDown = (e) => {
    const { code } = e;

    let changed = false;
    let value = getValueByPercent(percent);

    if (code === 'ArrowLeft') {
      value -= step;
      changed = true;
    }

    if (code === 'ArrowRight') {
      value += step;
      changed = true;
    }

    if (code === 'Home') {
      value = min;
      changed = true;
    }

    if (code === 'End') {
      value = max;
      changed = true;
    }

    if (code === 'PageUp') {
      value += (max - min) / 10;
      changed = true;
    }

    if (code === 'PageDown') {
      value -= (max - min) / 10;
      changed = true;
    }

    if (changed) {
      e?.preventDefault?.();
      const percent = getPercentByValue(value);
      value = getValueByPercent(percent);

      setTooltip(value);
      setPercent(percent);
      onSlide?.({}, value, percent);
      onChange?.({}, value);
    }
  };

  return (
    <BoxFactory
      map={map}
      ref={containerRef}
      {...rest}
      component={View}
      style={{
        height: iconSize,
        marginHorizontal: iconSize / 2,
      }}
      stylist={[variants.root, stylist]}
    >
      {/* Full Width Rule */}
      <BoxFactory
        map={map}
        style={{
          borderRadius: ruleSize / 2,
          marginTop: -ruleSize / 2,
          marginRight: -iconSize / 2,
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
          borderTopLeftRadius: ruleSize / 2,
          borderBottomLeftRadius: ruleSize / 2,
          marginTop: -ruleSize / 2,
          marginLeft: -iconSize / 2,
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
        <TooltipFactory map={map} title={tooltip ?? internal} visible={tooltip !== null} />
        <ThumbFactory
          map={map}
          ref={buttonRef}
          id={id}
          color={color}
          variant="solid"
          disabled={disabled}
          readOnly={readOnly}
          platform={
            !disabled &&
            !readOnly && {
              web: {
                onKeyDown: handleKeyDown,
                onMouseOver: () => setTooltip(getValueByPercent(percent)),
                onMouseOut: () => setTooltip(null),
                onFocus: () => setTooltip(getValueByPercent(percent)),
                onBlur: () => setTooltip(null),
              },
            }
          }
          style={[
            disabled && theme.components.Button.variants.disabled.true.styles.root,
            {
              left: -iconSize / 2,
              backgroundColor: color,
              borderRadius: iconSize / 2,
              minHeight: 0,
              minWidth: 0,
              paddingVertical: 0,
              paddingHorizontal: 0,
              height: iconSize,
              width: iconSize,
            },
          ]}
          stylist={[variants.thumb]}
        />
      </BoxFactory>

      {web && (
        <Input //
          hidden
          type="checkbox"
          name={name}
          readOnly={readOnly}
          value={internal}
          onChange={(e) => setPercent(getPercentByValue(e.target.value))}
        />
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(SliderFactory);
