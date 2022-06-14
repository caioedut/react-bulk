import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;

  autoFocus?: Boolean;
  disabled?: Boolean;
  style?: any;

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
  variant?: 'solid' | 'outline' | 'text' | string;
  size?: 'small' | 'medium' | 'large' | string;
  block?: Boolean;
  loading?: Boolean;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export type TextProps = {
  children: React.ReactNode;
  style?: any;

  size?: number;
  bold?: boolean;
  italic?: boolean;
  oblique?: boolean;
  smallCaps?: boolean;
  invisible?: boolean;

  numberOfLines?: number;
};
