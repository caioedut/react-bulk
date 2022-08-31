import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import { spacings } from '../../styles/jss';
import { CheckboxProps, FactoryProps } from '../../types';
import clsx from '../../utils/clsx';
import crypt from '../../utils/crypt';
import uuid from '../../utils/uuid';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';

function CheckboxFactory({ className, map, ...props }: FactoryProps & CheckboxProps, ref: any) {
  const theme = useTheme();
  const { web, Input } = map;
  const classes: any[] = ['rbk-checkbox', className];

  // Extends from default props
  props = { ...theme.components.Checkbox.defaultProps, ...props };

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
    style,
    labelStyle,
    containerStyle,
    ...rest
  } = props;

  id = id ?? `rbk-${crypt(uuid())}`;

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

  containerStyle = [extract(spacings, rest, style), containerStyle];

  return (
    <>
      <BoxFactory map={map} className={clsx(classes)} flexbox noWrap alignItems="center" style={containerStyle}>
        <ButtonFactory
          ref={buttonRef}
          map={map}
          id={id}
          variant="text"
          {...rest}
          startIcon={unique ? (internal ? 'CheckCircle' : 'Circle') : internal ? 'CheckSquare' : 'Square'}
          onPress={handleChange}
          style={[{ padding: 0 }, style]}
          accessibility={{
            role: 'checkbox',
            state: { checked: internal },
          }}
        />

        {Boolean(label) && (
          <LabelFactory map={map} numberOfLines={1} for={id} style={[{ ml: 1, flex: 1 }, labelStyle]}>
            {label}
          </LabelFactory>
        )}
      </BoxFactory>

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
    </>
  );
}

export default React.forwardRef(CheckboxFactory);
