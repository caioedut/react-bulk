import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import rect from '../../element/rect';
import scrollIntoView from '../../element/scrollIntoView';
import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import Check from '../../icons/Check';
import ChevronDown from '../../icons/ChevronDown';
import ChevronUp from '../../icons/ChevronUp';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import only from '../../props/only';
import { spacings } from '../../styles/jss';
import { AnyObject, InputValue, RbkInputEvent, RequiredSome, SelectOption, SelectProps } from '../../types';
import deepmerge from '../../utils/deepmerge';
import global from '../../utils/global';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import CardFactory from '../CardFactory';
import DropdownFactory from '../DropdownFactory';
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
      accessibility,
      defaultValue,
      disabled,
      id,
      color,
      colorful,
      controlled,
      error: errorProp,
      label,
      loading,
      name,
      options: arrOptions = [],
      placeholder,
      readOnly,
      size,
      value,
      // Events
      onFocus,
      onBlur,
      onChange,
      onFormChange,
      // Styles
      variants,
      buttonStyle,
      errorStyle,
      labelStyle,
      style,
      ...rest
    } = factory2<RequiredSome<SelectProps, 'color' | 'size'>>(props, options);

    id = useHtmlId(id);

    const form = useForm();
    const defaultRef: any = useRef(null);
    const buttonRef = ref || defaultRef;
    const scrollRef: any = useRef(null);
    const selectedRef: any = useRef(null);
    const optionsRef: any = useRef([]);

    const [initialValue] = useState(defaultValue);
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState<SelectProps['error']>();
    const [metrics, setMetrics] = useState<AnyObject>({ placement: 'bottom' });
    const [visible, _setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(arrOptions?.findIndex((item) => item.value == initialValue));

    const [_internal, _setInternal] = useState(value ?? initialValue);

    const internal = useMemo(() => {
      return _internal;
    }, [_internal]);

    const setInternal = useCallback(
      (value) => {
        if (controlled) return;
        _setInternal(value);
      },
      [controlled],
    );

    const setVisible = useCallback((value) => {
      _setVisible(value);
      if (!value) {
        setFocused(false);
      }
    }, []);

    const selected = useMemo(() => arrOptions?.find((item) => item.value == internal), [arrOptions, internal]);

    color = theme.color(error ? 'error' : color || 'primary');

    accessibility = deepmerge({ label: label ?? placeholder }, accessibility, { state: { expanded: visible } });

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 1.25,
        small: 1.75,
        medium: 2.25,
        large: 2.75,
        xlarge: 3.25,
      });
    }

    const baseSize = theme.rem(size as number);
    const fontSize = baseSize / 2;
    const spacing = (baseSize - theme.rem(0.75)) / 2;

    const focus = useCallback(() => buttonRef?.current?.focus?.(), [buttonRef]);
    const blur = useCallback(() => buttonRef?.current?.blur?.(), [buttonRef]);
    const clear = useCallback(() => setInternal(initialValue), [initialValue, setInternal]);
    const isFocused = useCallback(
      () => Boolean(buttonRef?.current?.isFocused?.()) || buttonRef?.current === document?.activeElement,
      [buttonRef],
    );

    const dispatchEvent = useCallback(
      (
        type: string,
        newValue: InputValue,
        event: AnyObject | null,
        eventHandler?: (event: RbkInputEvent, value: InputValue, option: SelectOption | null) => void,
      ) => {
        const nativeEvent = event?.nativeEvent ?? event ?? null;
        const value = newValue ?? null;
        const option = arrOptions?.find((item) => item.value == value) ?? null;

        if (type === 'change') {
          setInternal(value);
        }

        if (eventHandler instanceof Function) {
          eventHandler(
            {
              type,
              value,
              name,
              target: buttonRef.current,
              form,
              focus,
              blur,
              clear,
              isFocused,
              nativeEvent,
            },
            value,
            option,
          );
        }
      },
      [buttonRef, name, form, focus, blur, clear, isFocused, setInternal, arrOptions],
    );

    useEffect(() => {
      // TODO (?)
      // dispatchEvent('change', value, null, onChange);

      if (typeof value === 'undefined') return;
      _setInternal(value);
    }, [value]);

    useEffect(() => {
      setError(errorProp);
    }, [errorProp]);

    useEffect(() => {
      if (!name || !form) return;

      form.setField({
        name,
        get: () => internal ?? null,
        set: (value) => dispatchEvent('change', value, null, onChange),
        setError,
        onFormChange,
      });

      return () => {
        form.unsetField(name as string);
      };
    }, [name, form, internal, dispatchEvent, onChange, onFormChange]);

    useEffect(() => {
      if (!visible || !selectedRef.current) return;

      setTimeout(() => {
        scrollIntoView(scrollRef.current, selectedRef.current, true);
      }, 100);
    }, [metrics?.maxHeight, visible]);

    function optionFocus(index) {
      if (index < 0 || index > arrOptions.length - 1) {
        index = 0;
      }

      optionsRef?.current?.[index]?.focus?.();
      setActiveIndex(index);
    }

    const handleOpen = async () => {
      optionFocus(arrOptions?.findIndex((item) => item.value == internal));

      const { pageOffsetY, height, width } = await rect(buttonRef.current);

      const placement = pageOffsetY <= dimensions.height / 2 ? 'bottom' : 'top';
      const marginBottom = placement === 'top' ? height : 0;
      const maxWidth = dimensions.width;
      const maxHeight = Math.min(theme.rem(20), dimensions.height - pageOffsetY);

      setMetrics({ placement, width, maxHeight, maxWidth, marginBottom });
      setVisible((current) => (readOnly ? false : !current));
    };

    const handleChange = (event, value: InputValue) => {
      if (readOnly || disabled) return;

      dispatchEvent('change', value, event, onChange);
    };

    const handleSelect = (event, option: SelectOption) => {
      handleChange(event, option.value);
      setVisible(false);
      focus();
    };

    const handleFocus = (event) => {
      setFocused(true);
      dispatchEvent('focus', internal, event, onFocus);
    };

    const handleBlur = (event) => {
      setFocused(visible || false);
      dispatchEvent('blur', internal, event, onBlur);
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

    // @ts-expect-error
    style = [extract(spacings, rest), style];

    labelStyle = [error && { color: 'error' }, labelStyle];

    return (
      <BoxFactory style={style} stylist={[variants.root, stylist]} onKeyDown={visible ? handleKeyDown : undefined}>
        {Boolean(label) && (
          <LabelFactory
            numberOfLines={1}
            for={id}
            forRef={buttonRef}
            style={labelStyle}
            stylist={[variants.label]}
            onPress={native ? handleOpen : undefined}
          >
            {label}
          </LabelFactory>
        )}

        <ButtonFactory
          ref={buttonRef}
          color={!error && !focused && !colorful ? 'gray.light' : color}
          endAddon={
            loading ? (
              <LoadingFactory size={fontSize / theme.rem()} color={color} />
            ) : visible ? (
              <ChevronUp svg={svg} size={fontSize} color={color} />
            ) : (
              <ChevronDown svg={svg} size={fontSize} color={color} />
            )
          }
          {...rest}
          accessibility={accessibility}
          id={id}
          size={size}
          disabled={disabled}
          variant="outline"
          style={buttonStyle}
          contentStyle={{ flex: 1, maxWidth: '100%' }}
          onPress={handleOpen}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
            onChange={(e) => handleChange(e, e.target.value)}
          />
        )}

        <DropdownFactory visible={visible} onClose={() => setVisible(false)} placement={metrics.placement}>
          <CardFactory p={0} style={[{ overflow: 'hidden' }, only(['width', 'marginBottom'], metrics)]}>
            <ScrollableFactory ref={scrollRef} contentInset={1} maxh={metrics?.maxHeight} maxw={metrics?.maxWidth}>
              {arrOptions?.map((option, index) => {
                const isSelected = option.value == selected?.value;

                return (
                  <ButtonFactory
                    key={option.value}
                    size={size}
                    variant="text"
                    disabled={option.disabled}
                    color={color}
                    bg={isSelected ? theme.color(color, 0.1) : undefined}
                    style={{ paddingHorizontal: spacing }}
                    contentStyle={{ flex: 1, maxWidth: '100%' }}
                    onPress={(e) => handleSelect(e, option)}
                    endAddon={
                      <BoxFactory w={fontSize} pl={1}>
                        {isSelected && <Check svg={svg} size={fontSize} color={color} />}
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
        </DropdownFactory>
      </BoxFactory>
    );
  }),
);

SelectFactory.displayName = 'SelectFactory';

export default SelectFactory;
