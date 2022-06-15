import React from 'react';

export type Binding = {
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
};

export type TextProps = Binding & {
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

export type ButtonProps = Binding & {
  children: React.ReactNode;

  autoFocus?: Boolean;
  disabled?: Boolean;
  style?: any;

  variant?: 'solid' | 'outline' | 'text' | string;
  size?: 'small' | 'medium' | 'large' | string;
  block?: Boolean;
  loading?: Boolean;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export type ChangeCallback = (value: string, e: any) => any;

export type InputProps = Binding & {
  autoFocus?: Boolean;
  readOnly?: Boolean;
  disabled?: Boolean;
  style?: any;

  size?: 'small' | 'medium' | 'large' | string;
  label?: string;
  placeholder?: string;
  secure?: boolean;

  onChange?: ChangeCallback;

  /** @deprecated use onPress instead */
  onChangeText?: Function;
};
