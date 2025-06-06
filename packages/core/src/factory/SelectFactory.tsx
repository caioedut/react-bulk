import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import rect from '../element/rect';
import scrollIntoView from '../element/scrollIntoView';
import useDefaultRef from '../hooks/useDefaultRef';
import useHtmlId from '../hooks/useHtmlId';
import useInput from '../hooks/useInput';
import useTheme from '../hooks/useTheme';
import Check from '../icons/Check';
import ChevronDown from '../icons/ChevronDown';
import ChevronUp from '../icons/ChevronUp';
import MagnifyingGlass from '../icons/MagnifyingGlass';
import Times from '../icons/Times';
import extract from '../props/extract';
import factory2 from '../props/factory2';
import getSize from '../props/getSize';
import { spacings } from '../styles/constants';
import { AnyObject, RequiredSome, SelectProps } from '../types';
import deepmerge from '../utils/deepmerge';
import global from '../utils/global';
import string from '../utils/string';
import BackdropFactory from './BackdropFactory';
import BoxFactory from './BoxFactory';
import ButtonFactory from './ButtonFactory';
import CardFactory from './CardFactory';
import InputFactory from './InputFactory';
import LabelFactory from './LabelFactory';
import ListFactory from './ListFactory';
import LoadingFactory from './LoadingFactory';
import TextFactory from './TextFactory';

const SelectFactory = React.memo<SelectProps>(
  forwardRef(({ ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Select;
    const { web, native, svg, useDimensions } = global.mapping;

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
      error,
      label,
      loading,
      multiple,
      name,
      options: arrOptions = [],
      placeholder,
      readOnly,
      searchCount,
      size,
      value,
      // Events
      onFocus,
      onBlur,
      onChange,
      onFormChange,
      // Styles
      variants,
      contentStyle,
      buttonStyle,
      errorStyle,
      labelStyle,
      style,
      ...rest
    } = factory2<RequiredSome<SelectProps, 'color' | 'size' | 'searchCount'>>(props, options);

    const buttonRef = useDefaultRef<any>(ref);
    const scrollRef = useRef<any>();
    const selectedRef = useRef<any>();
    const optionsRef = useRef<any>([]);

    const input = useInput({
      name,
      value,
      defaultValue: multiple && !value && !defaultValue ? [null] : defaultValue,
      error,
      controlled,
      editable: !disabled && !readOnly,
      onChange: (event, value) => dispatchEvent('change', event, onChange, value),
      onFormChange,
    });

    const [focused, setFocused] = useState(false);
    const [metrics, setMetrics] = useState<AnyObject>({});
    const [visible, _setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const [search, setSearch] = useState('');
    const hasSearch = Number(arrOptions?.length ?? 0) >= searchCount;

    const setVisible = useCallback((value) => {
      _setVisible(value);
      setFocused(value);
      setSearch('');
    }, []);

    const selected = useMemo(() => {
      if (multiple) {
        const values = Array.isArray(input.state) ? input.state : [];
        return arrOptions?.filter((item) => values.includes(item.value)) || [];
      }
      return arrOptions?.find((item) => item.value == input.state);
    }, [arrOptions, input.state, multiple]);

    const mainColor = props.color || 'primary';
    id = useHtmlId(id);
    size = getSize(size);
    color = theme.color(input.error ? 'error' : !focused && !colorful ? 'gray.light' : mainColor);
    accessibility = deepmerge({ label: label ?? placeholder }, accessibility, { state: { expanded: visible } });

    const baseSize = theme.rem(size);
    const fontSize = baseSize / 2;
    const spacing = (baseSize - theme.rem(0.75)) / 2;

    const displayLabel = useMemo(() => {
      if (multiple) {
        if (!selected?.length) return placeholder ?? '';
        return (
          <BoxFactory row wrap g={0.25} ml={-2}>
            {(selected as any[]).map((item) => (
              <BoxFactory
                key={item.value}
                row
                noWrap
                center
                px={2}
                py={1}
                corners={1}
                bg={theme.color(mainColor, 0.2)}
                maxw="100%"
              >
                <TextFactory variant="caption" color={mainColor} numberOfLines={1} bold>
                  {item.label}
                </TextFactory>
                <ButtonFactory
                  variant="text"
                  component={web ? 'div' : undefined}
                  color={mainColor}
                  size={size / 2}
                  circular
                  ml={1}
                  mr={-0.5}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleSelect(e, item.value);
                  }}
                  startAddon={({ color }) => <Times svg={svg} size={fontSize / 2} color={color} />}
                />
              </BoxFactory>
            ))}
          </BoxFactory>
        );
      }
      return (selected as any)?.label ?? (selected as any)?.value ?? placeholder ?? '';
    }, [selected, placeholder, multiple, color, size, theme]);

    const focus = useCallback(() => buttonRef?.current?.focus?.(), [buttonRef]);
    const blur = useCallback(() => buttonRef?.current?.blur?.(), [buttonRef]);
    const clear = useCallback(() => input.clear(), [input]);
    const reset = useCallback(() => input.reset(), [input]);
    const isFocused = useCallback(
      () => Boolean(buttonRef?.current?.isFocused?.()) || buttonRef?.current === document?.activeElement,
      [buttonRef],
    );

    function dispatchEvent(type, event, handler?, value?) {
      if (typeof handler !== 'function') return;

      value = typeof value === 'undefined' ? input.state : value;

      const form = input.form;
      const target = buttonRef.current;
      const option = arrOptions?.find((item) => item.value == value) ?? null;

      return handler?.(
        {
          ...event,
          handler: 'RbkInputEvent',
          type,
          value,
          name,
          form,
          focus,
          blur,
          clear,
          reset,
          isFocused,
          target,
        },
        value,
        option,
      );
    }

    const filteredOptions = (arrOptions || []).filter((option) => {
      if (!hasSearch) {
        return true;
      }

      const searchValue = `${search ?? ''}`.trim();

      if (!searchValue) {
        return true;
      }

      return string(option.searchLabel ?? option.label)
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });

    useEffect(() => {
      if (!visible || !selectedRef.current) return;

      setTimeout(() => {
        scrollIntoView(scrollRef.current, selectedRef.current, false);
      }, 100);
    }, [scrollRef, selectedRef, metrics?.maxHeight, visible]);

    function optionFocus(index: number) {
      if (index < 0 || index > filteredOptions.length - 1) {
        index = 0;
      }

      // TODO: wait for RN Pressable compatibility with focus
      if (web) {
        optionsRef?.current?.[index]?.focus?.();
      }

      setActiveIndex(index);
    }

    async function handleOpen() {
      if (!buttonRef.current) return;

      optionFocus(arrOptions?.findIndex((item) => item.value == input.state));

      const { pageOffsetX, pageOffsetY, width, height } = await rect(buttonRef.current);

      const gutter = theme.spacing(3);
      const newMetrics: AnyObject = { left: pageOffsetX, width };

      if (pageOffsetY <= dimensions.height / 2) {
        newMetrics.top = Math.max(gutter, pageOffsetY + height);
      } else {
        newMetrics.bottom = Math.max(gutter, dimensions.height - pageOffsetY);
      }

      const sub = (newMetrics.top || 0) + (newMetrics.bottom || 0);
      newMetrics.maxHeight = Math.min(theme.rem(20), dimensions.height - gutter - sub);
      newMetrics.maxWidth = dimensions.width - gutter * 2;

      setMetrics(newMetrics);
      setVisible((current: boolean) => (readOnly ? false : !current));
    }

    function handleFocus(event) {
      setFocused(true);
      dispatchEvent('focus', event, onFocus);
    }

    function handleBlur(event) {
      setFocused(visible || false);
      dispatchEvent('blur', event, onBlur);
    }

    function handleSelect(event, value) {
      if (disabled || readOnly) return;

      if (multiple) {
        const currentValues = Array.isArray(input.state) ? input.state : [];
        
        // null/undefined must clear selecion
        if (value === null || value === undefined) {
          input.setState([value], event);
          setVisible(false);
          return;
        }

        // selecting value, must remove null/undefined values
        const filteredValues = currentValues.filter(v => v !== null && v !== undefined);
        
        const newValues = filteredValues.includes(value)
          ? filteredValues.filter((v) => v !== value)
          : [...filteredValues, value];
        input.setState(newValues, event);
      } else {
        input.setState(value, event);
        setVisible(false);
      }

      // TODO: wait for RN Pressable compatibility with focus
      if (web && !multiple) {
        focus();
      }
    }

    function handleSearch(event, value: string) {
      optionsRef.current = [];
      setSearch(value);
      setActiveIndex(0);
    }

    function handleKeyDown(event) {
      const { key } = event;

      const hasHandler = ['Escape', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(key);

      let newIndex = activeIndex;

      if (key === 'Escape') {
        return setVisible(false);
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
        newIndex = filteredOptions.length - 1;
      }

      if (key === 'PageUp') {
        newIndex = Math.max(newIndex - 3, 0);
      }

      if (key === 'PageDown') {
        newIndex = Math.min(newIndex + 3, filteredOptions.length - 1);
      }

      if (newIndex >= filteredOptions.length) {
        newIndex = 0;
      }

      if (newIndex < 0) {
        newIndex = filteredOptions.length - 1;
      }

      if (hasHandler) {
        event?.preventDefault?.();
        optionFocus(newIndex);
      }
    }

    // @ts-expect-error
    style = [extract(spacings, rest), style];

    labelStyle = [input.error && { color: 'error' }, labelStyle];

    contentStyle = [{ flex: 1 }, contentStyle];

    return (
      <BoxFactory
        data-rbk-input={name}
        style={style}
        variants={{ root: variants.root }}
        onKeyDown={visible ? handleKeyDown : undefined}
      >
        {Boolean(label) && (
          <LabelFactory
            numberOfLines={1}
            for={id}
            forRef={buttonRef}
            style={labelStyle}
            variants={{ root: variants.label }}
            onPress={native ? handleOpen : undefined}
          >
            {label}
          </LabelFactory>
        )}

        <ButtonFactory
          ref={buttonRef}
          color={color}
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
          contentStyle={contentStyle}
          onPress={handleOpen}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {typeof displayLabel === 'string' ? (
            <TextFactory numberOfLines={1} w="100%">
              {displayLabel}
            </TextFactory>
          ) : (
            displayLabel
          )}
        </ButtonFactory>

        {Boolean(input.error) && typeof input.error === 'string' && (
          <TextFactory variant="caption" style={errorStyle} variants={{ root: variants.error }}>
            {input.error}
          </TextFactory>
        )}

        <BackdropFactory visible={visible} style={{ bg: 'rgba(0, 0, 0, 0.2)' }} onPress={() => setVisible(false)}>
          <CardFactory position="absolute" p={0} style={[{ overflow: 'hidden' }, metrics]}>
            {hasSearch && (
              <BoxFactory p={1}>
                <InputFactory
                  color={color}
                  size={size}
                  value={search}
                  onChange={handleSearch}
                  startAddon={<MagnifyingGlass svg={svg} size={fontSize} color={color} />}
                />
              </BoxFactory>
            )}

            {visible && (
              <ListFactory
                ref={scrollRef}
                rowHeight={baseSize + theme.spacing(1)}
                renderDelay={10}
                contentInset={1}
                maxh={metrics?.maxHeight ?? 0}
                maxw={metrics?.maxWidth ?? 0}
              >
                {filteredOptions?.map((option, index) => {
                  const isSelected = multiple
                    ? (Array.isArray(input.state) ? input.state : []).includes(option.value)
                    : option.value == (selected as any)?.value;

                  return (
                    <ButtonFactory
                      my={0.5}
                      key={option.value}
                      size={size}
                      variant="text"
                      disabled={option.disabled}
                      color={color}
                      bg={isSelected ? theme.color(color, 0.1) : undefined}
                      style={{ paddingHorizontal: spacing }}
                      contentStyle={contentStyle}
                      onPress={(e) => handleSelect(e, option.value)}
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
                      accessibility={{
                        // @ts-expect-error
                        role: native ? 'menuitem' : 'option',
                        value: { now: option.value },
                        state: { selected: isSelected },
                      }}
                    >
                      {typeof option.label === 'string' ? <TextFactory>{option.label}</TextFactory> : option.label}
                    </ButtonFactory>
                  );
                })}
              </ListFactory>
            )}
          </CardFactory>
        </BackdropFactory>
      </BoxFactory>
    );
  }),
);

SelectFactory.displayName = 'SelectFactory';

export default SelectFactory;
