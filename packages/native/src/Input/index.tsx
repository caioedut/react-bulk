import React, { forwardRef } from 'react';

import { createInput, useTheme } from '@react-bulk/core';
import { InputProps } from '@react-bulk/core/types';

import map from '../../map';

type InputPropsNative = InputProps & {
  keyboardAppearance?: 'light' | 'dark';
  selectionColor?: string;
  underlineColorAndroid?: string;
  secureTextEntry?: boolean;
};

const Input = forwardRef(({ ...rest }: InputPropsNative, ref) => {
  const theme = useTheme();

  const props: any = {
    keyboardAppearance: theme.mode,
    selectionColor: theme.colors.primary.main,
    underlineColorAndroid: 'transparent',
    ...rest,
  };

  if (props.placeholder) {
    props.placeholderTextColor = theme.hex2rgba(theme.colors.text.primary, 0.4);
  }

  if (props.secure) {
    props.secureTextEntry = true;
  }

  if ('readOnly' in props) {
    props.editable = Boolean(props.readOnly);
  }

  if ('disabled' in props) {
    props.editable = !props.disabled;
  }

  return createInput(props, ref, map);
});

export default Input;
