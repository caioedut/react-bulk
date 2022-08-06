import React, { useCallback, useEffect, useRef, useState } from 'react';

import { crypt, uuid } from '@react-bulk/core';

import { spacings } from '../../styles/jss';
import { CheckboxProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import LabelFactory from '../LabelFactory';

function CheckboxFactory(
  {
    // error,
    unique,
    // Html
    id,
    className,
    checked,
    defaultChecked,
    name,
    placeholder,
    readOnly,
    // Custom
    label,
    // Bindings
    onChange,
    // Styles
    style,
    labelStyle,
    containerStyle,
    // Core
    map,
    ...rest
  }: CheckboxProps | any,
  ref: any,
) {
  const { web, Input } = map;
  const classes: any[] = ['rbk-checkbox', className];

  id = id ?? `rbk-${crypt(uuid())}`;

  const defaultRef: any = useRef(null);
  const buttonRef = ref || defaultRef;

  const [internal, setInternal] = useState(Boolean(+defaultChecked));

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      setInternal(checked);
    }
  }, [checked]);

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

  containerStyle = [
    ...spacings
      .filter((attr) => attr in rest)
      .map((attr) => {
        const val = rest[attr];
        delete rest[attr];
        return { [attr]: val };
      }),
    containerStyle,
  ];

  return (
    <>
      <BoxFactory map={map} className={clsx(classes)} flexbox wrap={false} alignItems="baseline" style={containerStyle}>
        <ButtonFactory
          ref={buttonRef}
          map={map}
          id={id}
          variant="text"
          {...rest}
          startIcon={unique ? (checked ? 'CheckCircle' : 'Circle') : checked ? 'CheckSquare' : 'Square'}
          onPress={handleChange}
          style={[{ padding: 0 }, style]}
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
          defaultValue="1"
          checked={checked}
          onChange={handleChange}
        />
      )}
    </>
  );
}

export default React.forwardRef(CheckboxFactory);
