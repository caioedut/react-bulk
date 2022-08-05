import React from 'react';

import { crypt, useTheme, uuid } from '@react-bulk/core';

import get from '../../props/get';
import { spacings } from '../../styles/jss';
import { CheckboxProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import IconFactory from '../IconFactory';
import InputFactory from '../InputFactory';
import LabelFactory from '../LabelFactory';
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
    unique,
    size,
    color,
    onChange,
    className,
    style,
    inputStyle,
    labelStyle,
    map,
    ...rest
  }: CheckboxProps | any,
  ref: any,
) {
  const theme = useTheme();
  const { web } = map;

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
      p: 0,
    },

    size === 'small' && { fontSize: theme.rem(0.75) },

    size === 'large' && { fontSize: theme.rem(1.25) },

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

    inputStyle,
  ];

  const fontSize = get('fontSize', inputStyle, style);
  const iconSize = fontSize * 1.25;

  if (unique) {
    inputStyle.unshift({ borderRadius: iconSize / 2 });
  }

  labelStyle = [
    {
      fontSize,
      flex: 1,
      ml: 1,
    },

    labelStyle,
  ];

  const handlePress = (e) => {
    if (typeof onChange === 'function') {
      onChange(e, !checked);
    }
  };

  return (
    <BoxFactory map={map} style={style} className={clsx('rbk-checkbox', className)}>
      <BoxFactory map={map} flexbox wrap={false} alignItems="center" disabled={disabled}>
        <ButtonFactory
          map={map}
          ref={web ? null : ref}
          id={id}
          variant="text"
          color={color}
          disabled={disabled}
          h={iconSize}
          w={iconSize}
          {...rest}
          style={inputStyle}
          onPress={handlePress}
        >
          {unique ? (
            <IconFactory map={map} name={checked ? 'CheckCircle' : 'Circle'} size={iconSize} />
          ) : (
            <IconFactory map={map} name={checked ? 'CheckSquare' : 'Square'} size={iconSize} />
          )}
        </ButtonFactory>
        {Boolean(label) && (
          <LabelFactory map={map} for={id} numberOfLines={1} style={labelStyle}>
            {label}
          </LabelFactory>
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
