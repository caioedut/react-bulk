import React, { forwardRef } from 'react';

import { createInput, useTheme } from '@react-bulk/core';

import map from '../../map';

const Input = forwardRef(({ ...rest }: any, ref) => {
  const theme = useTheme();

  const props: any = {
    keyboardAppearance: theme.mode,
    selectionColor: theme.colors.primary.main,
    underlineColorAndroid: 'transparent',
  };

  if (rest.placeholder) {
    props.placeholderTextColor = theme.hex2rgba(theme.colors.text.primary, 0.4);
  }

  return createInput({ ...props, ...rest }, ref, map);
});

export default Input;
