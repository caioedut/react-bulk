import { forwardRef } from 'react';
import { TextInputProps } from 'react-native';

import { createInput, useTheme } from '@react-bulk/core';
import { InputProps } from '@react-bulk/core/src/types';

import map from '../../map';

type InputPropsNative = TextInputProps & InputProps;

const Input = forwardRef(({ ...props }: InputPropsNative, ref) => {
  const theme = useTheme();

  props = {
    keyboardAppearance: theme.mode,
    selectionColor: theme.colors.primary.main,
    underlineColorAndroid: 'transparent',
    ...props,
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
