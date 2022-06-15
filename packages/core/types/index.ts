import React from 'react';

export type Bindings = {
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

export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline';

export type BoxProps = Bindings & {
  component?: any;
  className?: any;
  children?: React.ReactNode;
  style?: any;

  // Flexbox container
  flexbox?: boolean | 'flex' | 'flex-inline';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flow?: string;
  justifyContent?: FlexAlign;
  alignContent?: FlexAlign;
  justifyItems?: FlexAlign;
  alignItems?: FlexAlign;

  // Flexbox item
  flex?: boolean;
  order?: number;
  grow?: number;
  shrink?: number;
  basis?: 'auto' | number | string;
  align?: FlexAlign;
  justify?: FlexAlign;
};

export type TextProps = BoxProps & {
  size?: number;
  bold?: boolean;
  italic?: boolean;
  oblique?: boolean;
  smallCaps?: boolean;
  invisible?: boolean;
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width';

  numberOfLines?: number;
};

export type ButtonProps = BoxProps & {
  autoFocus?: Boolean;
  disabled?: Boolean;
  style?: any;

  variant?: 'solid' | 'outline' | 'text' | string;
  size?: 'small' | 'medium' | 'large' | string;
  block?: Boolean;
  loading?: Boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export type ChangeCallback = (value: string, e: any) => any;

export type InputProps = BoxProps & {
  autoFocus?: Boolean;
  readOnly?: Boolean;
  disabled?: Boolean;

  size?: 'small' | 'medium' | 'large' | string;
  label?: string;
  placeholder?: string;
  secure?: boolean;

  onChange?: ChangeCallback;

  /** @deprecated use onPress instead */
  onChangeText?: Function;
};

export type CardProps = BoxProps & {};
