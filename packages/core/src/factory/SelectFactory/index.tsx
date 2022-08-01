import React, { useState } from 'react';

import { useTheme } from '@react-bulk/core';

import Platform from '../../Platform';
import { spacings } from '../../styles/jss';
import { SelectProps } from '../../types';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import DropdownFactory from '../DropdownFactory';
import InputFactory from '../InputFactory';
import TextFactory from '../TextFactory';

function SelectFactory(
  {
    options,
    placeholder,
    label,
    error,
    name,
    value,
    color,
    disabled,
    onChange,
    style,
    inputStyle,
    labelStyle,
    map,
    ...rest
  }: SelectProps | any,
  ref: any,
) {
  const theme = useTheme();
  const { web } = Platform;
  const { Label } = map;

  const [visible, setVisible] = useState(false);
  const selected = options.find((option) => option.value == value);

  color = color ?? theme.colors.primary.main;

  style = [
    ...spacings
      .filter((attr) => attr in rest)
      .map((attr) => {
        const val = rest[attr];
        delete rest[attr];
        return { [attr]: val };
      }),
    style,
  ];

  labelStyle = [{ mb: 1 }, labelStyle];

  const handlePressOption = (e, option) => {
    setVisible(false);

    if (typeof onChange === 'function') {
      onChange(e, option.value, option);
    }
  };

  const handleChange = (e) => {
    const option = options.find((option) => option.value == value);
    handlePressOption(e, option);
  };

  return (
    <BoxFactory map={map} style={style}>
      {Boolean(label) && (
        <TextFactory map={map} component={Label} numberOfLines={1} style={labelStyle}>
          {label}
        </TextFactory>
      )}

      <ButtonFactory
        ref={web ? null : ref}
        map={map}
        color={color}
        disabled={disabled}
        {...rest}
        block
        wrap={false}
        type="button"
        variant="outline"
        style={inputStyle}
        onPress={() => setVisible((current) => !current)}
      >
        <TextFactory map={map} flex style={{ textAlign: 'left' }}>
          {selected?.label ?? selected?.value ?? placeholder ?? ''}
        </TextFactory>
        <TextFactory map={map} size={0.625} color={color}>
          {visible ? '▲' : '▼'}
        </TextFactory>
      </ButtonFactory>

      {Boolean(error) && (
        <TextFactory map={map} mt={1} ml={1} numberOfLines={1} size={0.8} color="error">
          {error}
        </TextFactory>
      )}

      {web && <InputFactory map={map} ref={ref} type="hidden" name={name} value={value ?? ''} onChange={handleChange} />}

      <DropdownFactory map={map} visible={visible} p={1} mt={0.5} w="100%">
        {options?.map((option) => (
          <ButtonFactory
            key={option.value}
            map={map}
            block
            wrap={false}
            type="button"
            variant="text"
            disabled={option.disabled}
            onPress={(e) => handlePressOption(e, option)}
          >
            <TextFactory map={map} flex style={{ textAlign: 'left' }}>
              {option.label}
            </TextFactory>
            {option.value == selected?.value && (
              <TextFactory map={map} color={color}>
                ✓
              </TextFactory>
            )}
          </ButtonFactory>
        ))}
      </DropdownFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(SelectFactory);
