import { forwardRef } from 'react';
import { TextInputProps } from 'react-native';

import { useTheme } from '@react-bulk/core';
import InputFactory from '@react-bulk/core/src/factory/InputFactory';
import { InputProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type InputPropsNative = TextInputProps & InputProps;

function Input({ ...props }: InputPropsNative, ref) {
  const map = useMap();
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

  return <InputFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Input);
