import React, { forwardRef, useCallback, useMemo } from 'react';

import useDefaultRef from '../hooks/useDefaultRef';
import useHtmlId from '../hooks/useHtmlId';
import useInput from '../hooks/useInput';
import useTheme from '../hooks/useTheme';
import Check from '../icons/Check';
import extract from '../props/extract';
import factory2 from '../props/factory2';
import getSize from '../props/getSize';
import { spacings } from '../styles/constants';
import { CheckboxProps, RequiredSome } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';
import ButtonFactory from './ButtonFactory';
import { useForm } from './FormFactory';
import LabelFactory from './LabelFactory';
import TextFactory from './TextFactory';

const CheckboxFactory = React.memo<CheckboxProps>(
  forwardRef(({ ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Checkbox;
    const { native, svg } = global.mapping;

    // Extends from default props
    let {
      checked,
      color,
      controlled,
      defaultChecked,
      disabled,
      error,
      id,
      label,
      name,
      readOnly,
      size,
      unique,
      value: valueProp,
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
    } = factory2<RequiredSome<CheckboxProps, 'color' | 'size'>>(props, options);

    const form = useForm();
    const buttonRef = useDefaultRef<any>(ref);

    // #hack to get initial CHECKED instead of value from prop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialCheckedFromFromInitialValue = useMemo(() => form?.initialData?.[name!], []);

    const input = useInput({
      name,
      value: (initialCheckedFromFromInitialValue ?? checked) ? (valueProp ?? true) : false,
      defaultValue: defaultChecked ? (valueProp ?? true) : false,
      error,
      controlled,
      editable: !disabled && !readOnly,
      onChange: (event, value) => dispatchEvent('change', event, onChange, value),
      onFormChange,
    });

    id = useHtmlId(id);
    size = getSize(size);
    color = theme.color(input.error ? 'error' : color);

    const baseSize = theme.rem(size as number);
    const fontSize = baseSize / 2;
    const halfSize = fontSize / 2;

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
      );
    }

    function handleFocus(event) {
      dispatchEvent('focus', event, onFocus);
    }

    function handleBlur(event) {
      dispatchEvent('blur', event, onBlur);
    }

    function handleChange(event) {
      if (disabled || readOnly) return;
      input.setState(!input.state, event);
    }

    // @ts-expect-error
    style = [style, extract(spacings, rest)];

    buttonStyle = [{ marginLeft: -theme.rem(0.5, fontSize) }, buttonStyle];

    return (
      <>
        <BoxFactory data-rbk-input={name} style={style} variants={{ root: variants.root }}>
          <ButtonFactory
            ref={buttonRef}
            {...rest}
            circular
            id={id}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onPress={handleChange}
            color={color}
            disabled={disabled}
            size={size}
            variant="text"
            style={buttonStyle}
            variants={{ root: variants.button }}
            accessibility={{
              label: typeof label === 'string' ? label : undefined,
              role: unique ? 'radio' : 'checkbox',
              state: { checked: input.state },
            }}
          >
            <BoxFactory
              center
              h={fontSize}
              w={fontSize}
              border={`2px solid ${color}`}
              borderRadius={unique ? halfSize : theme.shape.borderRadius / 2}
              bg={input.state && !unique ? color : undefined}
            >
              {Boolean(input.state) && (
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
              variants={{ root: variants.label }}
              onPress={native ? handleChange : undefined}
            >
              {label}
            </LabelFactory>
          ) : (
            label
          )}
        </BoxFactory>

        {Boolean(input.error) && typeof input.error === 'string' && (
          <TextFactory variant="caption" style={errorStyle} variants={{ root: variants.error }}>
            {input.error}
          </TextFactory>
        )}
      </>
    );
  }),
);

CheckboxFactory.displayName = 'CheckboxFactory';

export default CheckboxFactory;
