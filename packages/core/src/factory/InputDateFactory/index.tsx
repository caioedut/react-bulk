import React, { forwardRef, useCallback, useRef, useState } from 'react';

import reference from '../../element/reference';
import useInput from '../../hooks/useInput';
import useTheme from '../../hooks/useTheme';
import Calendar from '../../icons/Calendar';
import factory2 from '../../props/factory2';
import getSize from '../../props/getSize';
import { InputDateProps, RequiredSome } from '../../types';
import { dateify } from '../../utils/date';
import global from '../../utils/global';
import BackdropFactory from '../BackdropFactory';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import CalendarFactory from '../CalendarFactory';
import CardFactory from '../CardFactory';
import CollapseFactory from '../CollapseFactory';
import DividerFactory from '../DividerFactory';
import DropdownFactory from '../DropdownFactory';
import GridFactory from '../GridFactory';
import InputBaseFactory from '../InputBaseFactory';

const InputDateFactory = React.memo<InputDateProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.InputDate;
    const { locale, svg } = global.mapping;

    // Extends from default props
    let {
      color,
      defaultValue,
      disabled,
      error,
      format,
      locale: localeProp,
      max,
      min,
      name,
      readOnly,
      size,
      translate,
      value,
      variant,
      // Events
      onChange,
      onFocus,
      onBlur,
      onSubmit,
      onFormChange,
      // Styles
      variants,
      styleMap,
      style,
      ...rest
    } = factory2<RequiredSome<InputDateProps, 'color'>, typeof options>(props, options);

    const inputRef = useRef<any>();
    const triggerRef = useRef();
    const Component =
      variant === 'dropdown' ? DropdownFactory : variant === 'inline' ? CollapseFactory : BackdropFactory;

    const [calendarVisible, setCalendarVisible] = useState(false);

    const resolveAsDate = useCallback(
      (value) => {
        if (!value) {
          return null;
        }

        let dateValue = dateify(value);
        const dateMin = min ? dateify(min) : null;
        const dateMax = max ? dateify(max) : null;

        if (dateMin && dateValue < dateMin) {
          dateValue = dateMin;
        }

        if (dateMax && dateValue > dateMax) {
          dateValue = dateMax;
        }

        return dateValue ?? null;
      },
      [max, min],
    );

    const resolveAsISO = useCallback(
      (value) => {
        return resolveAsDate(value)?.toISOString()?.substring(0, 10) ?? null;
      },
      [resolveAsDate],
    );

    const resolveToFormat = useCallback(
      (value) => {
        const dateValue = resolveAsDate(value);

        if (!dateValue) {
          return '';
        }

        if (format || localeProp || locale) {
          return dateValue.toLocaleDateString(localeProp || locale, {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            ...format,
          });
        }

        return dateValue.toISOString().substring(0, 10);
      },
      [format, locale, localeProp, resolveAsDate],
    );

    const input = useInput({
      name,
      value,
      defaultValue,
      error,
      editable: !disabled && !readOnly,
      mask: (value) => resolveToFormat(value),
      unmask: (value) => resolveAsISO(value),
      onChange: (event, value) => dispatchEvent('change', event, onChange, value),
      onFormChange,
    });

    size = getSize(size);
    color = theme.color(input.error ? 'error' : color);

    const focus = useCallback(() => inputRef?.current?.focus?.(), [inputRef]);
    const blur = useCallback(() => inputRef?.current?.blur?.(), [inputRef]);
    const clear = useCallback(() => input.clear(), [input]);
    const reset = useCallback(() => input.reset(), [input]);
    const isFocused = useCallback(
      () => Boolean(inputRef?.current?.isFocused?.()) || inputRef?.current === document?.activeElement,
      [inputRef],
    );

    function dispatchEvent(type, event, handler?, value?) {
      if (typeof handler !== 'function') return;

      value = typeof value === 'undefined' ? input.state : value;

      const form = input.form;
      const target = inputRef.current;
      const nativeEvent = event?.nativeEvent ?? event ?? null;

      return handler?.({ type, value, name, form, focus, blur, clear, reset, isFocused, target, nativeEvent }, value);
    }

    function handleFocus(event) {
      dispatchEvent('focus', event, onFocus);
    }

    function handleBlur(event) {
      dispatchEvent('blur', event, onBlur);
    }

    function handleSubmit(event) {
      dispatchEvent('submit', event, onSubmit);
    }

    function handleChange(event, date) {
      if (disabled || readOnly) return;
      input.setState(resolveAsDate(date), event);
      setCalendarVisible(false);
    }

    return (
      <>
        <InputBaseFactory
          ref={reference(ref, inputRef)}
          style={style}
          stylist={stylist}
          styleMap={{ ...variants, ...styleMap }}
          {...rest}
          readOnly
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
          color={color}
          disabled={disabled}
          size={size}
          error={input.error}
          {...input.props}
          endAddon={
            <ButtonFactory
              ref={triggerRef}
              variant="text"
              color={color}
              size={size}
              disabled={disabled || readOnly}
              p={0}
              mr={-theme.shape.gap / 2}
              accessibility={{ label: 'calendar' }}
              onPress={() => setCalendarVisible((current) => !current)}
            >
              <Calendar svg={svg} size={Math.round(theme.rem(size / 2))} color={color} />
            </ButtonFactory>
          }
        />

        <Component
          visible={calendarVisible}
          {...(variant === 'dropdown'
            ? {
                triggerRef: triggerRef,
                r: 0,
                pt: 0.5,
                onClose: () => setCalendarVisible(false),
              }
            : variant === 'inline'
              ? {
                  alignItems: 'end',
                  p: 1,
                }
              : {
                  center: true,
                  onPress: () => setCalendarVisible(false),
                })}
        >
          <CardFactory minw={320} maxw={360} shadow={1} p={0}>
            <BoxFactory h={380}>
              <CalendarFactory
                shadow={0}
                color={color}
                date={input.state}
                events={input.state ? [input.state] : []}
                onPressDate={handleChange}
                disableds={(date) => {
                  const currentDate = dateify(date);
                  const minDate = min ? dateify(min) : null;
                  const maxDate = max ? dateify(max) : null;

                  if (minDate && currentDate < minDate) {
                    return true;
                  }

                  if (maxDate && currentDate > maxDate) {
                    return true;
                  }

                  return false;
                }}
              />
            </BoxFactory>

            <DividerFactory />

            <GridFactory gap m={0}>
              <BoxFactory>
                <ButtonFactory
                  variant="text"
                  color={color}
                  size={size}
                  accessibility={{ label: translate?.clear }}
                  onPress={(e) => handleChange(e, null)}
                >
                  {translate?.clear}
                </ButtonFactory>
              </BoxFactory>
              <BoxFactory xs p={0} />
              <BoxFactory>
                <ButtonFactory
                  variant="text"
                  color={color}
                  size={size}
                  accessibility={{ label: translate?.cancel }}
                  onPress={() => setCalendarVisible(false)}
                >
                  {translate?.cancel}
                </ButtonFactory>
              </BoxFactory>
              <BoxFactory>
                <ButtonFactory
                  variant="text"
                  color={color}
                  size={size}
                  accessibility={{ label: translate?.today }}
                  onPress={(e) => handleChange(e, dateify())}
                >
                  {translate?.today}
                </ButtonFactory>
              </BoxFactory>
            </GridFactory>
          </CardFactory>
        </Component>
      </>
    );
  }),
);

InputDateFactory.displayName = 'InputDateFactory';

export default InputDateFactory;
