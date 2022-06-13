import React from 'react';

export type ButtonProps = {
  autoFocus?: Boolean;
  disabled?: Boolean;
  children?: React.ReactNode;

  onPress?: Function;
  onPressIn?: Function;
  onPressOut?: Function;

  onFocus?: Function;
  onBlur?: Function;

  /** @deprecated use onPress instead */
  onClick?: Function;
  /** @deprecated use onPressIn instead */
  onMouseDown?: Function;
  /** @deprecated use onPressOut instead */
  onMouseUp?: Function;

  // Custom
  loading: Boolean;
};
