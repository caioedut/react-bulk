import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  BoxFactory,
  ButtonFactory,
  CheckboxProps,
  FactoryProps,
  LabelFactory,
  clsx,
  crypt,
  extract,
  useTheme,
  uuid,
} from '@react-bulk/core';

import { spacings } from '../../styles/jss';

function CheckboxFactory({ className, map, ...props }: FactoryProps & CheckboxProps, ref: any) {
  const theme = useTheme();
  const { web, Input } = map;
  const classes: any[] = ['rbk-checkbox', className];

  // Extends from default props
  props = { ...theme.components.Checkbox.defaultProps, ...props };

  let { checked, defaultChecked, id, label, name, onChange, placeholder, readOnly, unique, style, labelStyle, containerStyle, ...rest } =
    props;

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
