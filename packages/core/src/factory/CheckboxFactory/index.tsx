import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory from '../../props/factory';
import { spacings } from '../../styles/jss';
import { CheckboxProps, FactoryProps } from '../../types';
import useHtmlId from '../../useHtmlId';
import useStylist from '../../useStylist';
import pick from '../../utils/pick';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';

function CheckboxFactory({ stylist, map, innerRef, ...props }: FactoryProps & CheckboxProps) {
  const theme = useTheme();
  const options = theme.components.Checkbox;
  const { web, svg, Input } = map;
  const { Svg, Circle, Polyline } = svg;

  // Extends from default props
  let {
    checked,
    color,
    defaultChecked,
    id,
    label,
    name,
    onChange,
    placeholder,
    readOnly,
    size,
    unique,
    value,
    // Styles
    buttonStyle,
    labelStyle,
    style,
    ...rest
  } = factory(props, options.defaultProps);

  id = useHtmlId(id);
  color = theme.color(color);

  const form = useForm();
  const defaultRef: any = useRef(null);
  const buttonRef = innerRef || defaultRef;

  if (typeof size === 'string') {
    size = pick(size, 'medium', {
      xsmall: 0.625,
      small: 0.75,
      medium: 1,
      large: 1.25,
      xlarge: 1.625,
    });
  }

  const fontSize = theme.rem(size);
  const iconSize = fontSize * theme.typography.lineHeight;

  const [internal, setInternal] = useState(Boolean(+defaultChecked));

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      setInternal(checked);
    }
  }, [checked]);

  useEffect(() => {
    if (!name || !form) return;

    if (!unique || internal) {
      form.setField({
        name,
        set: setInternal as any,
        get: () => (internal ? value ?? internal : unique ? null : false),
      });
    }

    return () => {
      form.unsetField(name);
    };
  }, [name, form, internal, value]);

  const focus = useCallback(() => buttonRef?.current?.focus?.(), [buttonRef]);
  const blur = useCallback(() => buttonRef?.current?.blur?.(), [buttonRef]);
  const clear = useCallback(() => setInternal(Boolean(+defaultChecked)), []);
  const isFocused = useCallback(() => buttonRef?.current?.isFocused?.() || buttonRef?.current === document?.activeElement, [buttonRef]);

  function dispatchEvent(type: string, checked: boolean, nativeEvent?: any) {
    const callback = {
      change: onChange,
    }[type];

    if (typeof callback === 'function') {
      const target = buttonRef.current;
      callback({ type, checked, name, target, focus, blur, clear, isFocused, nativeEvent }, checked);
    }
  }

  const handleChange = (e) => {
    const nativeEvent = e?.nativeEvent ?? e;
    const checked = !internal;

    setInternal(checked);

    dispatchEvent('change', checked, nativeEvent);
  };

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleState = useStylist({
    style: extract(spacings, rest),
  });

  const styleButton = useStylist({
    name: options.name + 'button',
    style: options.defaultStyles.button,
  });

  const styleButtonState = useStylist({
    style: { marginLeft: -theme.rem(0.5, fontSize) },
  });

  return (
    <BoxFactory map={map} style={style} stylist={[styleRoot, styleState, stylist]}>
      <ButtonFactory
        innerRef={buttonRef}
        map={map}
        style={buttonStyle}
        stylist={[styleButton, styleButtonState]}
        color={color}
        size={size}
        {...rest}
        id={id}
        variant="text"
        rounded
        onPress={handleChange}
        accessibility={{
          role: unique ? 'radio' : 'checkbox',
          state: { checked: internal },
        }}
      >
        <BoxFactory
          map={map}
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
        <LabelFactory map={map} numberOfLines={1} for={buttonRef} style={[{ ml: 1, flex: 1 }, labelStyle]}>
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
}

export default React.memo(CheckboxFactory);
