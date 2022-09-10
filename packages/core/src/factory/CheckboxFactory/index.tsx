import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory from '../../props/factory';
import { spacings } from '../../styles/jss';
import { CheckboxProps, FactoryProps } from '../../types';
import useHtmlId from '../../useHtmlId';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';

function CheckboxFactory({ stylist, map, ...props }: FactoryProps & CheckboxProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Checkbox;
  const { web, Input } = map;

  // Extends from default props
  let {
    checked,
    defaultChecked,
    id,
    label,
    name,
    onChange,
    placeholder,
    readOnly,
    unique,
    value,
    buttonStyle,
    labelStyle,
    style,
    ...rest
  } = factory(props, options.defaultProps);

  id = useHtmlId(id);

  const form = useForm();
  const defaultRef: any = useRef(null);
  const buttonRef = ref || defaultRef;

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
        set: setInternal,
        get: () => (internal ? value ?? internal : unique ? null : false),
      });
    }

    return () => form.unsetField(name);
  }, [name, form, internal, value]);

  const focus = useCallback(() => {
    buttonRef?.current?.focus?.();
  }, [buttonRef]);

  const blur = useCallback(() => {
    buttonRef?.current?.blur?.();
  }, [buttonRef]);

  const clear = useCallback(() => {
    setInternal(Boolean(+defaultChecked));
  }, []);

  const isFocused = useCallback(() => {
    return buttonRef?.current?.isFocused?.() || buttonRef?.current === document?.activeElement;
  }, [buttonRef]);

  const handleChange = (e) => {
    const target = buttonRef?.current;
    const nativeEvent = e?.nativeEvent ?? e;
    const checked = !internal;

    setInternal(checked);

    onChange?.({ target, checked, focus, blur, clear, isFocused, nativeEvent }, checked);
  };

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleButton = useStylist({
    name: options.name + 'button',
    style: options.defaultStyles.button,
  });

  const styleState = useStylist({
    style: extract(spacings, rest),
  });

  return (
    <BoxFactory map={map} style={style} stylist={[styleRoot, styleState, stylist]}>
      <ButtonFactory
        ref={buttonRef}
        map={map}
        style={buttonStyle}
        stylist={styleButton}
        {...rest}
        id={id}
        variant="text"
        startIcon={unique ? (internal ? 'CheckCircle' : 'Circle') : internal ? 'CheckSquare' : 'Square'}
        onPress={handleChange}
        accessibility={{
          role: unique ? 'radio' : 'checkbox',
          state: { checked: internal },
        }}
      />

      {Boolean(label) && (
        <LabelFactory map={map} numberOfLines={1} for={id} style={[{ ml: 1, flex: 1 }, labelStyle]}>
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

export default React.forwardRef(CheckboxFactory);
