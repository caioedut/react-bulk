import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import Check from '../../icons/Check';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import { spacings } from '../../styles/constants';
import { AnyObject, CheckboxProps, RbkCheckboxEvent, RequiredSome } from '../../types';
import global from '../../utils/global';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';

const CheckboxFactory = React.memo<CheckboxProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Checkbox;
    const { web, native, svg, Input } = global.mapping;

    // Extends from default props
    let {
      checked,
      color,
      controlled,
      defaultChecked,
      disabled,
      id,
      label,
      name,
      readOnly,
      size,
      unique,
      value,
      // Events
      onFocus,
      onBlur,
      onChange,
      onFormChange,
      // Styles
      variants,
      buttonStyle,
      labelStyle,
      style,
      ...rest
    } = factory2<RequiredSome<CheckboxProps, 'color' | 'size'>>(props, options);

    id = useHtmlId(id);
    color = theme.color(color);

    const form = useForm();
    const defaultRef: any = useRef(null);
    const buttonRef = ref || defaultRef;

    const [initialChecked] = useState(defaultChecked);
    const [_internal, _setInternal] = useState(checked ?? initialChecked);

    const resolveValue = useCallback((value) => {
      return Boolean(Number(value));
    }, []);

    const internal = useMemo(() => {
      return resolveValue(_internal);
    }, [_internal, resolveValue]);

    const setInternal = useCallback(
      (value) => {
        if (controlled) return;
        _setInternal(resolveValue(value));
      },
      [controlled, resolveValue],
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

    const baseSize = theme.rem(size as number);
    const fontSize = baseSize / 2;
    const halfSize = fontSize / 2;

    const focus = useCallback(() => buttonRef?.current?.focus?.(), [buttonRef]);
    const blur = useCallback(() => buttonRef?.current?.blur?.(), [buttonRef]);
    const clear = useCallback(() => setInternal(initialChecked), [initialChecked, setInternal]);
    const isFocused = useCallback(
      () => Boolean(buttonRef?.current?.isFocused?.()) || buttonRef?.current === document?.activeElement,
      [buttonRef],
    );

    const dispatchEvent = useCallback(
      (
        type: string,
        newChecked: boolean,
        event: AnyObject | null,
        eventHandler?: (event: RbkCheckboxEvent, checked: boolean) => void,
      ) => {
        const nativeEvent = event?.nativeEvent ?? event ?? null;
        const checked = resolveValue(newChecked) ?? null;

        if (type === 'change') {
          setInternal(checked);
        }

        if (eventHandler instanceof Function) {
          eventHandler(
            {
              type,
              checked,
              name,
              target: buttonRef.current,
              form,
              focus,
              blur,
              clear,
              isFocused,
              nativeEvent,
            },
            checked,
          );
        }
      },
      [buttonRef, name, form, focus, blur, clear, isFocused, resolveValue, setInternal],
    );

    useEffect(() => {
      // TODO (?)
      // dispatchEvent('change', value, null, onChange);

      if (typeof checked !== 'boolean') return;
      _setInternal(checked);
    }, [checked]);

    useEffect(() => {
      if (!name || !form) return;

      if (!unique || internal) {
        form.setField({
          name,
          get: () => (internal ? value ?? internal : unique ? null : false),
          set: (checked) => dispatchEvent('change', checked, null, onChange),
          onFormChange,
        });
      }

      return () => {
        form.unsetField(name as string);
      };
    }, [name, form, value, internal, dispatchEvent, onChange, onFormChange, unique]);

    const handleChange = (event) => {
      if (disabled || readOnly) return;

      const checked = !internal;
      dispatchEvent('change', checked, event, onChange);
    };

    const handleFocus = (event) => {
      dispatchEvent('focus', internal, event, onFocus);
    };

    const handleBlur = (event) => {
      dispatchEvent('blur', internal, event, onBlur);
    };

    // @ts-expect-error
    style = [style, extract(spacings, rest)];

    buttonStyle = [{ marginLeft: -theme.rem(0.5, fontSize) }, buttonStyle];

    return (
      <BoxFactory data-rbk-input={name} style={style} stylist={[variants.root, stylist]}>
        <ButtonFactory
          ref={buttonRef}
          style={buttonStyle}
          stylist={[variants.button]}
          color={color}
          size={size}
          {...rest}
          id={id}
          variant="text"
          circular
          disabled={disabled}
          onPress={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibility={{
            label: typeof label === 'string' ? label : undefined ,
            role: unique ? 'radio' : 'checkbox',
            state: { checked: internal },
          }}
        >
          <BoxFactory
            center
            h={fontSize}
            w={fontSize}
            border={`2px solid ${color}`}
            borderRadius={unique ? halfSize : theme.shape.borderRadius}
            bg={internal && !unique ? color : undefined}
          >
            {Boolean(internal) && (
              <>
                {unique ? (
                  <svg.Svg viewBox="0 0 256 256" height="100%" width="100%">
                    <svg.Circle cx="128" cy="128" r="80" fill={color} />
                  </svg.Svg>
                ) : (
                  <Check svg={svg} size={fontSize} color={theme.contrast(color)} />
                )}
              </>
            )}
          </BoxFactory>
        </ButtonFactory>

        {typeof label === 'string' ? (
          <LabelFactory
            for={id}
            forRef={buttonRef}
            style={[{ ml: 1 }, labelStyle]}
            onPress={native ? handleChange : undefined}
          >
            {label}
          </LabelFactory>
        ) : label}

        {web && (
          <Input //
            hidden
            type="checkbox"
            name={name}
            readOnly={readOnly}
            value={`${value ?? 1}`}
            checked={internal}
            onChange={handleChange}
          />
        )}
      </BoxFactory>
    );
  }),
);

CheckboxFactory.displayName = 'CheckboxFactory';

export default CheckboxFactory;
