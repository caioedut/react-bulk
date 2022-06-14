import React from 'react';

export type ButtonProps = {
  autoFocus?: Boolean;
  disabled?: Boolean;
  style?: any;
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
  variant?: 'solid' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  block?: Boolean;
  loading?: Boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};
