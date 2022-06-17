import React, { CSSProperties } from 'react';

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

export type ThemeColorsProps = {
  main?: string;
  light?: string;
  dark?: string;
};

export type ThemeProps = {
  mode: 'light' | 'dark' | string;
  spacing?: Function;
  colors?: {
    common?: {
      trans: 'rgba(0, 0, 0, 0)' | string;
      black: '#000000' | string;
      white: '#ffffff' | string;
    };
    text?: {
      primary?: string;
      secondary?: string;
      disabled?: string;
    };
    background?: {
      primary?: string;
      secondary?: string;
      disabled?: string;
    };
    primary?: ThemeColorsProps;
    secondary?: ThemeColorsProps;
    info?: ThemeColorsProps;
    success?: ThemeColorsProps;
    warning?: ThemeColorsProps;
    error?: ThemeColorsProps;
    [key: string]: ThemeColorsProps | any;
  };
  breakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
};

export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline';

export type CustomStyles = {
  h: number | string;
  w: number | string;

  bg: string;
  border: string;
  shadow: string;

  t: number | string;
  b: number | string;
  l: number | string;
  r: number | string;
  m: number | string;
  mt: number | string;
  mb: number | string;
  ml: number | string;
  mr: number | string;
  mx: number | string;
  my: number | string;
  p: number | string;
  pt: number | string;
  pb: number | string;
  pl: number | string;
  pr: number | string;
  px: number | string;
  py: number | string;
};

export type BoxProps = Bindings &
  CustomStyles & {
    component?: any;
    className?: any;
    children?: React.ReactNode;
    style?: CSSProperties & CustomStyles;

    // Flexbox container
    flexbox?: boolean | 'flex' | 'flex-inline';
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    wrap?: boolean | 'nowrap' | 'wrap' | 'wrap-reverse';
    flow?: string;
    justifyContent?: FlexAlign;
    alignContent?: FlexAlign;
    justifyItems?: FlexAlign;
    alignItems?: FlexAlign;
    center?: boolean;
    gap?: boolean | number;

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

export type CardProps = BoxProps;

export type ScrollableProps = BoxProps & {
  horizontal?: boolean;
};
