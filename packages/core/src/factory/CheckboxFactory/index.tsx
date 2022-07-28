import React from 'react';

import { useTheme } from '@react-bulk/core';

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
    options,
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
    containerStyle,
    map,
    ...rest
  }: CheckboxProps | any,
  ref: any,
) {
  const theme = useTheme();
  const { web } = Platform;

  color = color ?? 'primary';

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

  style = [
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

    web && disabled && { cursor: 'not-allowed' },

    web && {
      cursor: 'pointer',
      transition: 'box-shadow 0.2s ease',

      '&:focus': {
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
      },
    },

    style,
  ];

  const fontSize = get('fontSize', style);
  const iconSize = fontSize * theme.typography.lineHeight;

  const handlePress = (e) => {
    if (typeof onChange === 'function') {
      onChange(e, !checked);
    }
  };

  return (
    <BoxFactory map={map} style={containerStyle}>
      <BoxFactory map={map} flexbox wrap={false} alignItems="center" disabled={disabled}>
        <ButtonFactory
          map={map}
          ref={web ? null : ref}
          variant="outline"
          p={0}
          h={iconSize}
          w={iconSize}
          color={color}
          disabled={disabled}
          {...rest}
          style={style}
          onPress={handlePress}
        >
          {Boolean(checked) && (
            <TextFactory map={map} color={color} style={{ fontSize }}>
              ✓
            </TextFactory>
          )}
        </ButtonFactory>
        {Boolean(label) && (
          <TextFactory map={map} flex ml={1.5} style={{ fontSize }}>
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
