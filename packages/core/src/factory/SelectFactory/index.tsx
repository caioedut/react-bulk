import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory from '../../props/factory';
import { spacings } from '../../styles/jss';
import { AnyObject, FactoryProps, SelectProps } from '../../types';
import useHtmlId from '../../useHtmlId';
import useStylist from '../../useStylist';
import BackdropFactory from '../BackdropFactory';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import CardFactory from '../CardFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';
import ScrollableFactory from '../ScrollableFactory';
import TextFactory from '../TextFactory';

function SelectFactory({ stylist, map, ...props }: FactoryProps & SelectProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Select;
  const { web, native, dimensions, Input } = map;

  // Extends from default props
  let {
    defaultValue,
    id,
    color,
    error,
    label,
    name,
    onChange,
    options: arrOptions,
    placeholder,
    readOnly,
    value,

    buttonStyle,
    errorStyle,
    labelStyle,
    style,
    ...rest
  } = factory(props, options.defaultProps);

  id = useHtmlId(id);

  const form = useForm();
  const defaultRef: any = useRef(null);
  const buttonRef = ref || defaultRef;
  const scrollRef: any = useRef(null);
  const selectedRef: any = useRef(null);
  const optionsRef: any = useRef([]);

  const [metrics, setMetrics] = useState<AnyObject>({});
  const [visible, setVisible] = useState(false);
  const [internal, setInternal] = useState(arrOptions?.find((item) => item.value == defaultValue));
  const [activeIndex, setActiveIndex] = useState(arrOptions?.findIndex((item) => item.value == defaultValue));

  const gutter = theme.spacing(3);

  const nativeProps = !native ? {} : { onRequestClose: () => setVisible(false) };

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setInternal(arrOptions?.find((item) => item.value == value));
    }
  }, [value]);

  useEffect(() => {
    if (!name || !form) return;

    form.setField({
      name,
      set: setInternal,
      get: () => internal?.value,
    });

    return () => form.unsetField(name);
  }, [name, form, internal]);

  useEffect(() => {
    if (!visible || !selectedRef.current) return;

    if (web) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    }

    if (native) {
      setTimeout(() => {
        // @ts-ignore
        selectedRef.current.measureLayout(scrollRef.current, (left, top) => {
          const y = Math.max(0, top - metrics?.maxHeight / 2);
          scrollRef.current.scrollTo({ x: 0, y, animated: true });
        });
      }, 100);
    }
  }, [visible]);

  const focus = useCallback(() => buttonRef?.current?.focus?.(), [buttonRef]);
  const blur = useCallback(() => buttonRef?.current?.blur?.(), [buttonRef]);
  const clear = useCallback(() => setInternal(arrOptions?.find((item) => item.value == defaultValue)), []);
  const isFocused = useCallback(() => buttonRef?.current?.isFocused?.() || buttonRef?.current === document?.activeElement, [buttonRef]);

  const handleOpen = () => {
    const callback = ({ top, left, height, width }) => {
      const newMetrics: any = { left, width };

      if (top <= dimensions.height / 2) {
        newMetrics.top = Math.max(gutter, top + height);
      } else {
        newMetrics.bottom = Math.max(gutter, dimensions.height - top);
      }

      const sub = (newMetrics.top || 0) + (newMetrics.bottom || 0);
      newMetrics.maxHeight = Math.min(theme.rem(20), dimensions.height - gutter - sub);
      newMetrics.maxWidth = dimensions.width - gutter * 2;

      setMetrics(newMetrics);
      setVisible((current) => (readOnly ? false : !current));
    };

    if (web) {
      callback(buttonRef.current.getBoundingClientRect());
    }

    if (native) {
      // @ts-ignore
      buttonRef.current.measure((x, y, width, height, left, top) => callback({ top, left, height, width }));
    }
  };

  const handleChange = (e, option, autoFocus = false) => {
    const target = buttonRef?.current;
    const nativeEvent = e?.nativeEvent ?? e;
    const value = option.value;

    autoFocus && focus();
    onChange?.({ target, value, focus, blur, clear, isFocused, nativeEvent }, value, option);

    setInternal(arrOptions?.find((item) => item.value == value));
    setVisible(false);
  };

  const handleChangeBrowser = (e) => {
    const option = arrOptions.find((item) => item.value == e.target.value);
    handleChange(e, option, false);
  };

  const handleKeyDown = (e) => {
    const { code } = e;

    let newIndex = activeIndex;

    if (!['Enter', 'Escape'].includes(code)) {
      e?.preventDefault?.();
    }

    if (code === 'Escape') {
      return setVisible(false);
    }

    if (code === 'ArrowUp') {
      newIndex -= 1;
    }

    if (code === 'ArrowDown') {
      newIndex += 1;
    }

    if (code === 'Home') {
      newIndex = 0;
    }

    if (code === 'End') {
      newIndex = arrOptions.length - 1;
    }

    if (code === 'PageUp') {
      newIndex = Math.max(newIndex - 3, 0);
    }

    if (code === 'PageDown') {
      newIndex = Math.min(newIndex + 3, arrOptions.length - 1);
    }

    if (newIndex >= arrOptions.length) {
      newIndex = 0;
    }

    if (newIndex < 0) {
      newIndex = arrOptions.length - 1;
    }

    optionsRef?.current?.[newIndex]?.focus?.();
    setActiveIndex(newIndex);
  };

  const styleRoot = useStylist({
    name: arrOptions.name,
    style: options.defaultStyles.root,
  });

  const styleLabel = useStylist({
    name: options.name + '-label',
    style: options.defaultStyles.label,
  });

  const styleError = useStylist({
    name: options.name + '-error',
    style: options.defaultStyles.error,
  });

  const styleState = useStylist({
    style: extract(spacings, rest),
  });

  return (
    <BoxFactory map={map} style={style} stylist={[styleRoot, styleState, stylist]} onKeyDown={handleKeyDown}>
      {Boolean(label) && (
        <LabelFactory map={map} numberOfLines={1} for={buttonRef} style={labelStyle} stylist={[styleLabel]}>
          {label}
        </LabelFactory>
      )}

      <ButtonFactory
        ref={buttonRef}
        map={map}
        style={buttonStyle}
        block
        color={color}
        endIcon={
          <TextFactory map={map} color={color} style={{ transform: [{ scaleY: 0.65 }] }}>
            {visible ? '▲' : '▼'}
          </TextFactory>
        }
        {...rest}
        id={id}
        variant="outline"
        contentStyle={{ flex: 1 }}
        onPress={handleOpen}
      >
        <TextFactory map={map}>{internal?.label ?? internal?.value ?? placeholder ?? ''}</TextFactory>
      </ButtonFactory>

      {Boolean(error) && typeof error === 'string' && (
        <TextFactory map={map} variant="caption" style={errorStyle} stylist={[styleError]}>
          {error}
        </TextFactory>
      )}

      {web && (
        <Input //
          hidden
          type="text"
          name={name}
          readOnly={readOnly}
          value={`${internal?.value ?? ''}`}
          onChange={handleChangeBrowser}
        />
      )}

      <BackdropFactory map={map} visible={visible} style={{ bg: 'rgba(0, 0, 0, 0.2)' }} onPress={() => setVisible(false)} {...nativeProps}>
        <CardFactory map={map} position="absolute" p={0} style={[{ overflow: 'hidden' }, metrics]}>
          <ScrollableFactory map={map} ref={scrollRef} maxh={metrics?.maxHeight} maxw={metrics?.maxWidth} p={1}>
            {arrOptions?.map((option, index) => {
              const isSelected = option.value == internal?.value;

              return (
                <ButtonFactory
                  key={option.value}
                  map={map}
                  variant="text"
                  block
                  disabled={option.disabled}
                  bg={isSelected && theme.hex2rgba(color, 0.1)}
                  contentStyle={{ flex: 1 }}
                  onPress={(e) => handleChange(e, option, true)}
                  endIcon={
                    <BoxFactory map={map} center w="1rem" pl={1}>
                      {isSelected && (
                        <TextFactory map={map} color={color} size={1.25}>
                          ✓
                        </TextFactory>
                      )}
                    </BoxFactory>
                  }
                  ref={(el) => {
                    optionsRef.current[index] = el;

                    if (isSelected) {
                      selectedRef.current = el;
                    }
                  }}
                  platform={{
                    web: {
                      accessibility: {
                        role: 'option',
                        state: { selected: isSelected },
                      },
                    },
                  }}
                >
                  <TextFactory map={map}>{option.label}</TextFactory>
                </ButtonFactory>
              );
            })}
          </ScrollableFactory>
        </CardFactory>
      </BackdropFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(SelectFactory);
