import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import Calendar from '../../icons/Calendar';
import factory2 from '../../props/factory2';
import { DatePickerProps } from '../../types';
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
import GridFactory from '../GridFactory';
import InputFactory from '../InputFactory';

const DatePickerFactory = React.memo<DatePickerProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.DatePicker;
    const { svg } = global.mapping;

    // Extends from default props
    let {
      defaultValue,
      disabled,
      color,
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
    } = factory2<DatePickerProps>(props, options);

    const resolveValue = useCallback(
      (value) => {
        if (!value) {
          return null;
        }

        let dateValue = dateify(value);
        let dateMin = min ? dateify(min) : null;
        let dateMax = max ? dateify(max) : null;

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
      // TODO: fix setInternal called twice when using form.setData with prop controlled=true
      if (typeof value === 'undefined') return;
      setInternal(value);
    }, [value]);

    const handleChangeCalendar = useCallback((_, date) => {
      setInternal(date);
      setCalendarVisible(false);
    }, []);

    const handleChangeInternal = useCallback(
      (e, date) => {
        handleChangeCalendar(e, date);
        onChange?.(e, date);
      },
      [handleChangeCalendar, onChange],
    );

    return (
      <>
        <InputFactory
          ref={ref}
          readOnly
          disabled={disabled}
          {...rest}
          value={internal}
          onChange={handleChangeInternal}
          endAddon={
            <ButtonFactory
              variant={calendarVisible ? 'solid' : 'text'}
              color={color}
              size={size}
              disabled={disabled || readOnly}
              p={0}
              mr={-theme.shape.gap / 2}
              accessibility={{ label: 'calendar' }}
              onPress={() => setCalendarVisible((current) => !current)}
            >
              <Calendar
                svg={svg}
                size={Math.round(theme.rem(size / 2))}
                color={calendarVisible ? 'white' : theme.color(color)}
              />
            </ButtonFactory>
          }
        />

        <BoxFactory
          center
          visible={calendarVisible}
          {...(variant === 'inline'
            ? {
                component: CollapseFactory,
                padding: 3,
                mt: theme.shape.gap / 2,
                alignItems: 'end',
              }
            : {
                component: BackdropFactory,
                p: theme.shape.gap,
                onPress: () => setCalendarVisible(false),
              })}
        >
          <CardFactory minw={320} maxw={360} shadow={1} p={0}>
            <BoxFactory h={365}>
              <CalendarFactory
                color={color}
                date={internal}
                events={internal ? [internal] : []}
                onPressDate={handleChangeCalendar}
                disableds={(date) => {
                  let currentDate = dateify(date);
                  let minDate = min ? dateify(min) : null;
                  let maxDate = max ? dateify(max) : null;

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
        </BoxFactory>
      </>
    );
  }),
);

DatePickerFactory.displayName = 'DatePickerFactory';

export default DatePickerFactory;
