import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import Check from '../../icons/Check';
import ChevronDown from '../../icons/ChevronDown';
import ChevronUp from '../../icons/ChevronUp';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import { spacings } from '../../styles/jss';
import { AnyObject, RbkInputEvent, SelectProps } from '../../types';
import global from '../../utils/global';
import pick from '../../utils/pick';
import BackdropFactory from '../BackdropFactory';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import CardFactory from '../CardFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';
import LoadingFactory from '../LoadingFactory';
import ScrollableFactory from '../ScrollableFactory';
import TextFactory from '../TextFactory';

const SelectFactory = React.memo<SelectProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Select;
    const { web, native, svg, useDimensions, Input } = global.mapping;

    const dimensions = useDimensions();

    // Extends from default props
    let {
      defaultValue,
      id,
      color,
      controlled,
      error,
      label,
      loading,
      name,
      options: arrOptions,
      placeholder,
      readOnly,
      size,
      value,
      // Events
      onChange,
      onFormChange,
      // Styles
      variants,
      buttonStyle,
      errorStyle,
      labelStyle,
      style,
      ...rest
    } = factory2(props, options);

    id = useHtmlId(id);

    const form = useForm();
    const defaultRef: any = useRef(null);
    const buttonRef = ref || defaultRef;
    const scrollRef: any = useRef(null);
    const selectedRef: any = useRef(null);
    const optionsRef: any = useRef([]);

    const [metrics, setMetrics] = useState<AnyObject>({});
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(arrOptions?.findIndex((item) => item.value == defaultValue));

    const initialValue = useMemo(() => value ?? defaultValue, []);
    const dispatchRef = useRef(typeof initialValue === 'undefined');
    const [internal, _setInternal] = useState(initialValue);

    function setInternal(value: any, dispatch = true) {
      _setInternal(value);

      if (dispatch && dispatchRef.current) {
        // dispatchEvent(
        //   'change',
        //   arrOptions?.find((item) => item.value == value),
        // );
      }

      dispatchRef.current = true;
    }

    const selected = arrOptions?.find((item) => item.value == internal);

    color = error ? 'error' : color || 'primary';

    const gutter = theme.spacing(3);

    const nativeProps = !native ? {} : { onRequestClose: () => setVisible(false) };

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 1.25,
        small: 1.75,
        medium: 2.25,
        large: 2.75,
        xlarge: 3.25,
      });
    }

    const baseSize = theme.rem(size);
    const fontSize = baseSize / 2;
    const spacing = (baseSize - theme.rem(0.75)) / 2;

    useEffect(() => {
      if (typeof value === 'undefined') return;
      setInternal(value);
    }, [value]);

    useEffect(() => {
      if (!name || !form) return;

      form.setField({
        name,
        set: setInternal,
        get: () => selected?.value ?? null,
        onFormChange,
      });

      return () => {
        form.unsetField(name);
      };
    }, [name, form, onFormChange, selected]);

    useEffect(() => {
      if (!visible || !selectedRef.current) return;

      if (web) {
        selectedRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'start',
        });
      }

      if (native) {
        setTimeout(() => {
          if (selectedRef.current && scrollRef.current) {
            // @ts-ignore
            selectedRef.current.measureLayout(scrollRef.current, (left, top) => {
              const y = Math.max(0, top - metrics?.maxHeight / 2);
              scrollRef.current.scrollTo({ x: 0, y, animated: false });
            });
          }
        }, 100);
      }
    }, [visible]);

    const focus = useCallback(() => buttonRef?.current?.focus?.(), [buttonRef]);
    const blur = useCallback(() => buttonRef?.current?.blur?.(), [buttonRef]);
    const clear = useCallback(() => setInternal(defaultValue), []);
    const isFocused = useCallback(
      () => Boolean(buttonRef?.current?.isFocused?.()) || buttonRef?.current === document?.activeElement,
      [buttonRef],
    );

    function dispatchEvent(type: string, option, nativeEvent?: any) {
      const callback = {
        change: onChange,
      }[type];

      if (typeof callback === 'function') {
        const target = buttonRef.current;
        const value = option?.value;

        const event: RbkInputEvent = {
          type,
          value,
          name,
          target,
          form,
          focus,
          blur,
          clear,
          isFocused,
          nativeEvent,
        };

        callback(event, value, option);
      }
    }

    function optionFocus(index) {
      if (index < 0 || index > arrOptions.length - 1) {
        index = 0;
      }

      optionsRef?.current?.[index]?.focus?.();
      setActiveIndex(index);
    }

    const handleOpen = () => {
      optionFocus(arrOptions?.findIndex((item) => item.value == selected?.value));

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
      if (readOnly) return;

      const nativeEvent = e?.nativeEvent ?? e;
      const newSelected = arrOptions?.find((item) => item.value == option.value);

      if (!controlled) {
        setInternal(option.value, false);
      }

      setVisible(false);
      dispatchEvent('change', newSelected, nativeEvent);

      if (autoFocus) {
        focus();
      }
    };

    const handleChangeBrowser = (e) => {
      const option = arrOptions.find((item) => item.value == e.target.value);
      handleChange(e, option, false);
    };

    const handleKeyDown = (e) => {
      const { key } = e;

      let newIndex = activeIndex;

      if (key === 'Escape') {
        return setVisible(false);
      }

      if (key !== 'Enter') {
        e?.preventDefault?.();
      }

      if (key === 'ArrowUp') {
        newIndex -= 1;
      }

      if (key === 'ArrowDown') {
        newIndex += 1;
      }

      if (key === 'Home') {
        newIndex = 0;
      }

      if (key === 'End') {
        newIndex = arrOptions.length - 1;
      }

      if (key === 'PageUp') {
        newIndex = Math.max(newIndex - 3, 0);
      }

      if (key === 'PageDown') {
        newIndex = Math.min(newIndex + 3, arrOptions.length - 1);
      }

      if (newIndex >= arrOptions.length) {
        newIndex = 0;
      }

      if (newIndex < 0) {
        newIndex = arrOptions.length - 1;
      }

      optionFocus(newIndex);
    };

    style = [extract(spacings, rest), style];

    labelStyle = [error && { color: 'error' }, labelStyle];

    return (
      <BoxFactory style={style} stylist={[variants.root, stylist]} onKeyDown={visible ? handleKeyDown : undefined}>
        {Boolean(label) && (
          <LabelFactory
            numberOfLines={1}
            for={buttonRef}
            style={labelStyle}
            stylist={[variants.label]}
            onPress={native ? handleOpen : undefined}
          >
            {label}
          </LabelFactory>
        )}

        <ButtonFactory
          ref={buttonRef}
          block
          color={color}
          endAddon={
            loading ? (
              <LoadingFactory size={size} />
            ) : visible ? (
              <ChevronUp svg={svg} color={theme.color(color)} />
            ) : (
              <ChevronDown svg={svg} color={theme.color(color)} />
            )
          }
          {...rest}
          id={id}
          size={size}
          variant="outline"
          style={buttonStyle}
          contentStyle={{ flex: 1, maxWidth: '100%' }}
          onPress={handleOpen}
        >
          <TextFactory numberOfLines={1} w="100%">
            {selected?.label ?? selected?.value ?? placeholder ?? ''}
          </TextFactory>
        </ButtonFactory>

        {Boolean(error) && typeof error === 'string' && (
          <TextFactory variant="caption" style={errorStyle} stylist={[variants.error]}>
            {error}
          </TextFactory>
        )}

        {web && (
          <Input //
            hidden
            type="text"
            name={name}
            readOnly={readOnly}
            value={`${selected?.value ?? ''}`}
            onChange={handleChangeBrowser}
          />
        )}

        <BackdropFactory visible={visible} style={{ bg: 'rgba(0, 0, 0, 0.2)' }} onPress={() => setVisible(false)} {...nativeProps}>
          <CardFactory position="absolute" p={0} style={[{ overflow: 'hidden' }, metrics]}>
            <ScrollableFactory ref={scrollRef} contentInset={1} maxh={metrics?.maxHeight} maxw={metrics?.maxWidth}>
              {arrOptions?.map((option, index) => {
                const isSelected = option.value == selected?.value;

                return (
                  <ButtonFactory
                    key={option.value}
                    size={size}
                    variant="text"
                    block
                    disabled={option.disabled}
                    bg={isSelected ? theme.color(color, 0.1) : undefined}
                    style={{ paddingHorizontal: spacing }}
                    contentStyle={{ flex: 1 }}
                    onPress={(e) => handleChange(e, option, true)}
                    endAddon={
                      <BoxFactory w={fontSize} pl={1}>
                        {isSelected && <Check svg={svg} size={fontSize} color={theme.color(color)} />}
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
                    <TextFactory>{option.label}</TextFactory>
                  </ButtonFactory>
                );
              })}
            </ScrollableFactory>
          </CardFactory>
        </BackdropFactory>
      </BoxFactory>
    );
  }),
);

SelectFactory.displayName = 'SelectFactory';

export default SelectFactory;
