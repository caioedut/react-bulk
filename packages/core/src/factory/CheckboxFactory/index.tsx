import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import { spacings } from '../../styles/jss';
import { CheckboxProps, RbkChangeEvent } from '../../types';
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
    const { Svg, Circle, Polyline } = svg;

    // Extends from default props
    let {
      checked,
      color,
      controlled,
      defaultChecked,
      id,
      label,
      name,
      placeholder,
      readOnly,
      size,
      unique,
      value,
      // Events
      onChange,
      onFormChange,
      // Styles
      variants,
      buttonStyle,
      labelStyle,
      style,
      ...rest
    } = factory2(props, options);

    id = useHtmlId(id);
    color = theme.color(color);

    const form = useForm();
    const defaultRef: any = useRef(null);
    const buttonRef = ref || defaultRef;

    const [internal, _setInternal] = useState(Boolean(+defaultChecked));

    function setInternal(value: any, dispatch = true) {
      _setInternal(value);

      if (dispatch) {
        dispatchEvent('change', value);
      }
    }

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
    const iconSize = fontSize * theme.typography.lineHeight;

    useEffect(() => {
      if (typeof checked !== 'boolean') return;
      setInternal(checked);
    }, [checked]);

    useEffect(() => {
      if (!name || !form) return;

      if (!unique || internal) {
        form.setField({
          name,
          set: setInternal,
          get: () => (internal ? value ?? internal : unique ? null : false),
          onFormChange,
        });
      }

      return () => {
        form.unsetField(name);
      };
    }, [name, form, onFormChange, internal, value]);

    const focus = useCallback(() => buttonRef?.current?.focus?.(), [buttonRef]);
    const blur = useCallback(() => buttonRef?.current?.blur?.(), [buttonRef]);
    const clear = useCallback(() => setInternal(Boolean(+defaultChecked)), []);
    const isFocused = useCallback(
      () => Boolean(buttonRef?.current?.isFocused?.()) || buttonRef?.current === document?.activeElement,
      [buttonRef],
    );

    function dispatchEvent(type: string, checked: boolean, nativeEvent?: any) {
      const callback = {
        change: onChange,
      }[type];

      if (typeof callback === 'function') {
        const target = buttonRef.current;

        const event: Omit<RbkChangeEvent, 'value'> = {
          type,
          checked,
          name,
          target,
          form,
          focus,
          blur,
          clear,
          isFocused,
          nativeEvent,
        };

        callback(event, checked);
      }
    }

    const handleChange = (e) => {
      if (readOnly) return;

      const nativeEvent = e?.nativeEvent ?? e;
      const newInternal = !internal;

      if (!controlled) {
        setInternal(newInternal, false);
      }

      dispatchEvent('change', newInternal, nativeEvent);
    };

    style = [style, extract(spacings, rest)];

    buttonStyle = [{ marginLeft: -theme.rem(0.5, fontSize) }, buttonStyle];

    return (
      <BoxFactory style={style} stylist={[variants.root, stylist]}>
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
          onPress={handleChange}
          accessibility={{
            role: unique ? 'radio' : 'checkbox',
            state: { checked: internal },
          }}
        >
          <BoxFactory
            center
            h={iconSize}
            w={iconSize}
            style={{
              border: `2px solid ${color}`,
              borderRadius: unique ? iconSize / 2 : theme.shape.borderRadius,
            }}
          >
            {Boolean(internal) && (
              <Svg viewBox="0 0 256 256" height="100%" width="100%">
                {unique ? (
                  <Circle cx="128" cy="128" r="80" fill={color} />
                ) : (
                  <Polyline
                    points="216 72 104 184 48 128"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                  />
                )}
              </Svg>
            )}
          </BoxFactory>
        </ButtonFactory>

        {Boolean(label) && (
          <LabelFactory for={buttonRef} style={[{ ml: 1 }, labelStyle]} onPress={native ? handleChange : undefined}>
            {label}
          </LabelFactory>
        )}

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
