import React, { forwardRef, useCallback } from 'react';

import useDefaultRef from '../hooks/useDefaultRef';
import useHtmlId from '../hooks/useHtmlId';
import useInput from '../hooks/useInput';
import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import getSize from '../props/getSize';
import { RequiredSome, SwitchProps } from '../types';
import deepmerge from '../utils/deepmerge';
import global from '../utils/global';
import BoxFactory from './BoxFactory';
import ButtonFactory from './ButtonFactory';
import LabelFactory from './LabelFactory';
import TextFactory from './TextFactory';

const SwitchFactory = React.memo<SwitchProps>(
  forwardRef(({ ref, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.Switch;
    const { native } = global.mapping;

    // Extends from default props
    let {
      accessibility,
      checked,
      controlled,
      defaultChecked,
      disabled,
      error,
      id,
      label,
      name,
      readOnly,
      size,
      // Colors
      onColor,
      offColor,
      onThumbColor,
      offThumbColor,
      // Events
      onFocus,
      onBlur,
      onChange,
      onFormChange,
      // Styles
      variants,
      buttonStyle,
      thumbStyle,
      errorStyle,
      labelStyle,
      style,
      ...rest
    } = factory2<RequiredSome<SwitchProps, 'size' | 'onColor' | 'offColor' | 'onThumbColor' | 'offThumbColor'>>(
      props,
      options,
    );

    const buttonRef = useDefaultRef<any>(ref);

    const input = useInput({
      name,
      value: checked,
      defaultValue: defaultChecked,
      error,
      controlled,
      editable: !disabled && !readOnly,
      unmask: (state) => Boolean(state),
      onChange: (event, value) => dispatchEvent('change', event, onChange, value),
      onFormChange,
    });

    id = useHtmlId(id);
    size = getSize(size) - 0.375;

    const baseSize = theme.rem(size);
    const spacing = baseSize * 0.1;
    const thumbSize = baseSize - spacing * 2;

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

    buttonStyle = [
      {
        h: baseSize,
        w: (thumbSize + spacing) * 2,
      },
      buttonStyle,
    ];

    thumbStyle = [
      {
        h: thumbSize,
        w: thumbSize,
        borderRadius: thumbSize / 2,
        bg: input.state ? onThumbColor : offThumbColor,
      },
      thumbStyle,
    ];

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
            color={input.state ? onColor : offColor}
            disabled={disabled}
            size={size}
            variant="solid"
            style={buttonStyle}
            variants={{ root: variants.button }}
            contentStyle={{
              justifyContent: 'center',
              padding: spacing,
              w: '100%',
              h: '100%',
            }}
            accessibility={deepmerge(accessibility, {
              state: { checked: input.state },
            })}
          >
            <BoxFactory
              style={thumbStyle}
              variants={{ root: variants.thumb }}
              animation={{
                duration: 100,
                timing: 'ease-out',
                from: { marginLeft: input.state ? 0 : thumbSize },
                to: { marginLeft: input.state ? thumbSize : 0 },
              }}
            />
          </ButtonFactory>

          {typeof label === 'string' ? (
            <LabelFactory
              for={id}
              forRef={buttonRef}
              style={labelStyle}
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

SwitchFactory.displayName = 'SwitchFactory';

export default SwitchFactory;
