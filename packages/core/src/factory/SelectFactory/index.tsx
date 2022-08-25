import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import { FactoryProps, SelectProps } from '../../types';
import clsx from '../../utils/clsx';
import ButtonFactory from '../ButtonFactory';
import DropdownFactory from '../DropdownFactory';
import { useForm } from '../FormFactory';
import TextFactory from '../TextFactory';

function SelectFactory({ className, map, ...props }: FactoryProps & SelectProps, ref: any) {
  const theme = useTheme();
  const { web, Input } = map;
  const classes: any[] = ['rbk-select', className];

  // Extends from default props
  props = { ...theme.components.Select.defaultProps, ...props };

  let { defaultValue, name, onChange, options, placeholder, readOnly, value, ...rest } = props;

  const form = useForm();
  const defaultRef: any = useRef(null);
  const buttonRef = ref || defaultRef;

  const [visible, setVisible] = useState(false);
  const [internal, setInternal] = useState(options?.find((item) => item.value == defaultValue));

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setInternal(options?.find((item) => item.value == value));
    }
  }, [value]);

  useEffect(() => {
    if (!name || !form) return;

    form.setField({
      name,
      set: setInternal,
      get: () => internal,
    });
  }, [name, form, internal]);

  const focus = useCallback(() => {
    buttonRef?.current?.focus?.();
  }, [buttonRef]);

  const blur = useCallback(() => {
    buttonRef?.current?.blur?.();
  }, [buttonRef]);

  const clear = useCallback(() => {
    setInternal(options?.find((item) => item.value == defaultValue));
  }, []);

  const isFocused = useCallback(() => {
    return buttonRef?.current?.isFocused?.() || buttonRef?.current === document?.activeElement;
  }, [buttonRef]);

  const handleChange = (e, option) => {
    const target = buttonRef?.current;
    const nativeEvent = e?.nativeEvent ?? e;
    const value = option.value;

    setVisible(false);
    setInternal(options?.find((item) => item.value == value));

    onChange?.({ target, value, focus, blur, clear, isFocused, nativeEvent }, value, option);
  };

  const handleChangeNative = (e) => {
    const option = options.find((item) => item.value == e.target.value);
    handleChange(e, option);
  };

  return (
    <>
      <ButtonFactory
        ref={buttonRef}
        map={map}
        className={clsx(classes)}
        endIcon={visible ? 'CaretUp' : 'CaretDown'}
        {...rest}
        block
        type="button"
        variant="outline"
        onPress={() => setVisible((current) => (readOnly ? false : !current))}
      >
        <TextFactory map={map} flex style={{ textAlign: 'left' }}>
          {internal?.label ?? internal?.value ?? placeholder ?? ''}
        </TextFactory>
      </ButtonFactory>

      {web && (
        <Input //
          hidden
          type="text"
          name={name}
          readOnly={readOnly}
          value={`${internal?.value ?? ''}`}
          onChange={handleChangeNative}
        />
      )}

      <DropdownFactory
        map={map}
        visible={visible}
        style={{
          mt: 0.5,
          p: 1,
          w: '100%',
        }}
      >
        {options?.map((option) => (
          <ButtonFactory
            key={option.value}
            map={map}
            block
            wrap={false}
            type="button"
            variant="text"
            disabled={option.disabled}
            endIcon={option.value == internal?.value ? 'Check' : null}
            onPress={(e) => handleChange(e, option)}
          >
            <TextFactory map={map} flex style={{ textAlign: 'left' }}>
              {option.label}
            </TextFactory>
          </ButtonFactory>
        ))}
      </DropdownFactory>
    </>
  );
}

export default React.forwardRef(SelectFactory);
