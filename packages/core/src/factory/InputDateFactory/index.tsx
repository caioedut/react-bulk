import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import Calendar from '../../icons/Calendar';
import factory2 from '../../props/factory2';
import { InputDateProps } from '../../types';
import { dateify } from '../../utils/date';
import global from '../../utils/global';
import pick from '../../utils/pick';
import BackdropFactory from '../BackdropFactory';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import CalendarFactory from '../CalendarFactory';
import CardFactory from '../CardFactory';
import CollapseFactory from '../CollapseFactory';
import DividerFactory from '../DividerFactory';
import DropdownFactory from '../DropdownFactory';
import GridFactory from '../GridFactory';
import InputFactory from '../InputFactory';

const InputDateFactory = React.memo<InputDateProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.InputDate;
    const { svg } = global.mapping;

    // Extends from default props
    let {
      defaultValue,
      disabled,
      color,
      colorful,
      error,
      format,
      max,
      min,
      readOnly,
      size,
      translate,
      value,
      variant,
      // Events
      onChange,
      // Styles
      variants,
      ...rest
    } = factory2<InputDateProps>(props, options);

    const resolveValue = useCallback(
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

        return dateValue ? dateValue.toISOString().substring(0, 10) : null;
      },
      [min, max],
    );

    const triggerRef = useRef();

    const [calendarVisible, setCalendarVisible] = useState(false);
    const [_internal, _setInternal] = useState(value ?? defaultValue);

    const internal = useMemo(() => {
      return resolveValue(_internal);
    }, [_internal, resolveValue]);

    const setInternal = useCallback(
      (value) => {
        _setInternal(resolveValue(value));
      },
      [_setInternal, resolveValue],
    );

    color = theme.color(error ? 'error' : color || 'primary');

    const Component =
      variant === 'dropdown' ? DropdownFactory : variant === 'inline' ? CollapseFactory : BackdropFactory;

    if (typeof size === 'string') {
      size = pick(size, 'medium', {
        xsmall: 1.25,
        small: 1.75,
        medium: 2.25,
        large: 2.75,
        xlarge: 3.25,
      });
    }

    useEffect(() => {
      if (typeof value === 'undefined') return;
      _setInternal(value);
    }, [value]);

    const handleChangeCalendar = useCallback(
      (_, date) => {
        setInternal(date);
        setCalendarVisible(false);
      },
      [setInternal],
    );

    const handleChangeInternal = useCallback(
      (e, date) => {
        handleChangeCalendar(e, date);
        onChange?.(e, date);
      },
      [handleChangeCalendar, onChange],
    );

    return (
      <BoxFactory position="relative">
        <InputFactory
          ref={ref}
          readOnly
          disabled={disabled}
          error={error}
          color={color}
          colorful={colorful}
          {...rest}
          value={internal}
          onChange={handleChangeInternal}
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
                color={color}
                date={internal}
                events={internal ? [internal] : []}
                onPressDate={handleChangeCalendar}
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
                  onPress={(e) => handleChangeCalendar(e, null)}
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
                  onPress={(e) => handleChangeCalendar(e, dateify())}
                >
                  {translate?.today}
                </ButtonFactory>
              </BoxFactory>
            </GridFactory>
          </CardFactory>
        </Component>
      </BoxFactory>
    );
  }),
);

InputDateFactory.displayName = 'InputDateFactory';

export default InputDateFactory;
