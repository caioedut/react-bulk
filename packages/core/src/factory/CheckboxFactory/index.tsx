import React from 'react';

import { crypt, useTheme, uuid } from '@react-bulk/core';

import Platform from '../../Platform';
import get from '../../props/get';
import { spacings } from '../../styles/jss';
import { CheckboxProps } from '../../types';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import InputFactory from '../InputFactory';
import TextFactory from '../TextFactory';

function CheckboxFactory(
  {
    id,
    placeholder,
    label,
    error,
    name,
    value,
    checked,
    disabled,
    size,
    color,
    onChange,
    style,
    inputStyle,
    labelStyle,
    map,
    ...rest
  }: CheckboxProps | any,
  ref: any,
) {
  const theme = useTheme();
  const { web } = Platform;
  const { Label } = map;

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

  inputStyle = [
    {
      color,
      fontSize: theme.rem(1),
    },

    size === 'small' && {
      fontSize: theme.rem(0.875),
      padding: theme.rem(0.5, theme.rem(0.875)),
    },

    size === 'large' && {
      fontSize: theme.rem(1.25),
      padding: theme.rem(0.5, theme.rem(1.25)),
    },

    disabled && {
      color: theme.colors.background.disabled,
      opacity: 0.75,
    },

    checked && {
      backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.15),
    },

    web && disabled && { cursor: 'not-allowed' },

    web && {
      cursor: 'pointer',
      transition: 'box-shadow 0.2s ease',

      '&:focus': {
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
      },
    },

    inputStyle,
  ];

  const fontSize = get('fontSize', inputStyle) ?? get('fontSize', style);
  const iconSize = fontSize * theme.typography.lineHeight;

  labelStyle = [
    {
      fontSize,
      flex: 1,
      ml: 1.5,
    },

    labelStyle,
  ];

  const handlePress = (e) => {
    if (typeof onChange === 'function') {
      onChange(e, !checked);
    }
  };

  return (
    <BoxFactory map={map} style={style}>
      <BoxFactory map={map} flexbox wrap={false} alignItems="center" disabled={disabled}>
        <ButtonFactory
          map={map}
          ref={web ? null : ref}
          id={id}
          variant="outline"
          p={0}
          h={iconSize}
          w={iconSize}
          color={color}
          disabled={disabled}
          {...rest}
          style={inputStyle}
          onPress={handlePress}
        >
          {Boolean(checked) && (
            <TextFactory map={map} color={color} style={{ fontSize, fontWeight: 'bold' }}>
              ✓
            </TextFactory>
          )}
        </ButtonFactory>
        {Boolean(label) && (
          <TextFactory map={map} component={Label} htmlFor={id} style={labelStyle}>
            {label}
          </TextFactory>
        )}
      </BoxFactory>

      {Boolean(error) && (
        <TextFactory map={map} mt={1} ml={1} numberOfLines={1} size={0.8} color="error">
          {error}
        </TextFactory>
      )}

      {web && (
        <InputFactory
          map={map}
          ref={ref}
          hidden
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={handlePress}
        />
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(CheckboxFactory);
