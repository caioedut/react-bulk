import React, { useState } from 'react';

import { crypt, useTheme, uuid } from '@react-bulk/core';

import { spacings } from '../../styles/jss';
import { SelectProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import DropdownFactory from '../DropdownFactory';
import IconFactory from '../IconFactory';
import InputFactory from '../InputFactory';
import LabelFactory from '../LabelFactory';
import TextFactory from '../TextFactory';

function SelectFactory(
  {
    id,
    options,
    placeholder,
    label,
    error,
    name,
    value,
    color,
    disabled,
    onChange,
    className,
    style,
    inputStyle,
    labelStyle,
    map,
    ...rest
  }: SelectProps | any,
  ref: any,
) {
  const theme = useTheme();
  const { web } = map;

  const [visible, setVisible] = useState(false);
  const selected = options.find((option) => option.value == value);

  id = id ?? `rbk-${crypt(uuid())}`;
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
    <BoxFactory map={map} className={clsx('rbk-select', className)} style={style}>
      {Boolean(label) && (
        <LabelFactory map={map} for={id} numberOfLines={1} style={labelStyle}>
          {label}
        </LabelFactory>
      )}

      <ButtonFactory
        ref={web ? null : ref}
        map={map}
        id={id}
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
        <IconFactory map={map} name={visible ? 'CaretUp' : 'CaretDown'} size={theme.typography.fontSize} />
      </ButtonFactory>

      {Boolean(error) && (
        <TextFactory map={map} mt={1} ml={1} numberOfLines={1} size={0.8} color="error">
          {error}
        </TextFactory>
      )}

      {web && <InputFactory map={map} ref={ref} type="hidden" name={name} value={value ?? ''} onChange={handleChange} />}

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
