import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import rect from '../../element/rect';
import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FocusableProps, RbkRect, RequiredSome, SliderProps } from '../../types';
import event from '../../utils/event';
import global from '../../utils/global';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import { useForm } from '../FormFactory';
import TooltipFactory from '../TooltipFactory';

const SliderFactory = React.memo<SliderProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Slider;
    const { web, native, Input, View } = global.mapping;

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
      onFocus,
      onBlur,
      onSlide,
      onChange,
      onFormChange,
      // Styles
      variants,
      ...rest
    } = factory2<RequiredSome<SliderProps, 'min' | 'max'>>(props, options);

    id = useHtmlId(id);

    const form = useForm();

    const containerRef = useRef(null);
    const buttonRef = useRef<FocusableProps>(null);
    const dotRef = useRef(null);
    const barRef = useRef(null);

    const containerRectRef = useRef<RbkRect | null>(null);
    const dotIniPosRef = useRef<number | null>(null);
    const pressIniPosRef = useRef<number | null>(null);

    if (typeof size === 'string') {
      // TODO: standardize with other sizes
      size = pick(size, 'medium', {
        xsmall: 0.75,
        small: 0.875,
        medium: 1,
        large: 1.25,
        xlarge: 1.625,
      });
    }

    const step = 1;
    const iconSize = theme.rem(size as number);
    const ruleSize = iconSize / 4;

    // const ThumbFactory = web ? ButtonFactory : BoxFactory;
    const ThumbFactory = ButtonFactory;

    defaultValue = Math.min(max, Math.max(min, defaultValue ?? min ?? 0));
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
          onResponderGrant: handlePress,
          onResponderMove: handleMove,
          onResponderRelease: handleRelease,
          onResponderTerminate: handleRelease,
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
        onFormChange,
      });

      return () => {
        form.unsetField(name as string);
      };
    }, [name, form, onFormChange, getPercentByValue, getValueByPercent, percent]);

    useEffect(() => {
      if (!web) return;

      const removeMove = event(document, 'pointermove', handleMove);
      const removeRelease = event(document, 'pointerup', handleRelease);
      const removeCancel = event(document, 'pointercancel', handleRelease);

      return () => {
        removeMove();
        removeRelease();
        removeCancel();
      };
    }, [handleMove]);

    const focus = useCallback(() => buttonRef?.current?.focus?.(), [buttonRef]);
    const blur = useCallback(() => buttonRef?.current?.blur?.(), [buttonRef]);
    const clear = useCallback(() => setPercent(getPercentByValue(defaultValue)), []);
    const isFocused = useCallback(
      () => Boolean(buttonRef?.current?.isFocused?.()) || buttonRef?.current === document?.activeElement,
      [buttonRef],
    );

    function dispatchEvent(type: string, value: number, nativeEvent?: any) {
      const callback = {
        focus: onFocus,
        blur: onBlur,
        slide: onSlide,
        change: onChange,
      }[type];

      if (typeof callback === 'function') {
        const target = buttonRef.current;
        callback({ type, value, name, target, focus, blur, clear, isFocused, nativeEvent }, value);
      }
    }

    function setStyles($el, styles = {}) {
      if (web) {
        for (const attr in styles) {
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

    async function getState() {
      const $dot = dotRef.current;

      let percent;
      let value;

      if (containerRectRef.current) {
        const dotRect: RbkRect = await rect($dot);
        const targetX = dotRect.pageOffsetX - containerRectRef.current.pageOffsetX;

        percent = (targetX / containerRectRef.current.width) * 100;
        value = getValueByPercent(percent);
        percent = getPercentByValue(value);
      }

      return { percent, value };
    }

    const handleCommonEvent = useCallback(
      (e) => {
        const nativeEvent = e?.nativeEvent ?? e;
        dispatchEvent(e.type, internal, nativeEvent);
      },
      [internal],
    );

    async function handlePress(e) {
      e?.preventDefault?.();
      e?.persist?.();

      if (web && buttonRef.current) {
        // @ts-ignore
        buttonRef.current.focus?.();
      }

      const nativeEvent = e?.nativeEvent ?? e;
      const pageX = e?.pageX ?? e?.nativeEvent?.pageX;

      const $container = containerRef.current;
      const $dot = dotRef.current;
      const $bar = barRef.current;

      containerRectRef.current = await rect($container);

      let targetX = pageX - containerRectRef.current.pageOffsetX;
      targetX = Math.min(targetX, containerRectRef.current.width);
      targetX = Math.max(targetX, 0);

      setStyles($dot, { marginLeft: targetX });
      setStyles($bar, { width: targetX });

      const percent = (targetX / containerRectRef.current.width) * 100;
      const value = getValueByPercent(percent);

      setTooltip(value);
      dispatchEvent('slide', value, nativeEvent);

      const dotRect = await rect($dot);
      dotIniPosRef.current = dotRect.pageOffsetX;
      pressIniPosRef.current = pageX;
    }

    async function handleMove(e) {
      if (dotIniPosRef.current === null) return;

      e?.preventDefault?.();
      e?.persist?.();

      const nativeEvent = e?.nativeEvent ?? e;
      const pageX = e?.pageX ?? e?.nativeEvent?.pageX;

      if (containerRectRef.current) {
        let targetX = pageX - containerRectRef.current.pageOffsetX;
        targetX = Math.min(targetX, containerRectRef.current.width);
        targetX = Math.max(targetX, 0);

        setStyles(dotRef.current, { marginLeft: targetX });
        setStyles(barRef.current, { width: targetX });

        const percent = (targetX / containerRectRef.current.width) * 100;
        const value = getValueByPercent(percent);

        setTooltip(value);
        dispatchEvent('slide', value, nativeEvent);
      }
    }

    async function handleRelease(e) {
      if (dotIniPosRef.current === null) return;

      e?.preventDefault?.();
      e?.persist?.();

      const nativeEvent = e?.nativeEvent ?? e;
      const { percent, value } = await getState();

      // Reset styles
      setStyles(dotRef.current, { marginLeft: web ? '' : undefined });
      setStyles(barRef.current, { width: web ? '' : undefined });

      // Reset refs
      containerRectRef.current = null;
      pressIniPosRef.current = null;
      dotIniPosRef.current = null;

      setTooltip(null);
      setPercent(percent);

      dispatchEvent('slide', value, nativeEvent);
      dispatchEvent('change', value, nativeEvent);
    }

    const handleKeyDown = (e) => {
      let changed = false;
      let value = getValueByPercent(percent);

      const isKey = (...keys) => [e.code, e.key].some((eKey) => keys.includes(eKey));

      if (isKey('ArrowRight', 'ArrowUp')) {
        value += step;
        changed = true;
      }

      if (isKey('ArrowLeft', 'ArrowDown')) {
        value -= step;
        changed = true;
      }

      if (isKey('Home')) {
        value = min;
        changed = true;
      }

      if (isKey('End')) {
        value = max;
        changed = true;
      }

      if (isKey('PageUp')) {
        value += (max - min) / 10;
        changed = true;
      }

      if (isKey('PageDown')) {
        value -= (max - min) / 10;
        changed = true;
      }

      if (changed) {
        e?.preventDefault?.();
        e?.persist?.();

        const nativeEvent = e?.nativeEvent ?? e;
        const percent = getPercentByValue(value);
        value = getValueByPercent(percent);

        setTooltip(value);
        setPercent(percent);

        dispatchEvent('slide', value, nativeEvent);
        dispatchEvent('change', value, nativeEvent);
      }
    };

    return (
      <BoxFactory
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
          <TooltipFactory title={`${tooltip ?? internal}`} visible={tooltip !== null} />
          <ThumbFactory
            ref={buttonRef}
            id={id}
            color={color}
            variant="solid"
            disabled={disabled}
            readOnly={readOnly}
            onFocus={handleCommonEvent}
            onBlur={handleCommonEvent}
            platform={
              disabled || readOnly
                ? {}
                : {
                    web: {
                      onKeyDown: handleKeyDown,
                      onPointerOver: () => !pressIniPosRef.current && setTooltip(getValueByPercent(percent)),
                      onPointerOut: () => !pressIniPosRef.current && setTooltip(null),
                      onFocus: () => setTooltip(getValueByPercent(percent)),
                      onBlur: () => setTooltip(null),
                    },
                  }
            }
            style={[
              disabled && theme.components.Button?.variants?.disabled?.true?.root,
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
  }),
);

SliderFactory.displayName = 'SliderFactory';

export default SliderFactory;
