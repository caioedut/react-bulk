import { CSSProperties, ReactNode } from 'react';

export type FactoryProps = {
  map: any;
};

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
  h?: number | string;
  w?: number | string;

  minw?: number | string;
  maxw?: number | string;

  minh?: number | string;
  maxh?: number | string;

  bg?: string;
  border?: string;
  shadow?: string;

  t?: number | string;
  b?: number | string;
  l?: number | string;
  r?: number | string;
  m?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  mx?: number | string;
  my?: number | string;
  p?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  px?: number | string;
  py?: number | string;
};

export type JssStyles = (CSSProperties & CustomStyles) | Array<CSSProperties> | Array<CustomStyles> | Array<any> | any;

export type BoxProps = Bindings &
  CustomStyles & {
    component?: any;
    className?: any;
    children?: ReactNode;
    style?: JssStyles;
    block?: JssStyles;

    // Flexbox container
    flexbox?: boolean | 'flex' | 'flex-inline';
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    row?: boolean;
    column?: boolean;
    reverse?: boolean;
    wrap?: boolean | 'nowrap' | 'wrap' | 'wrap-reverse';
    flow?: string;
    justifyContent?: FlexAlign;
    alignContent?: FlexAlign;
    justifyItems?: FlexAlign;
    alignItems?: FlexAlign;
    center?: boolean;

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
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title' | 'subtitle' | 'caption';
  size?: number;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | string;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  justify?: boolean;
  bold?: boolean;
  italic?: boolean;
  oblique?: boolean;
  smallCaps?: boolean;
  invisible?: boolean;
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width';

  numberOfLines?: number;
};

export type ButtonProps = BoxProps & {
  autoFocus?: Boolean;
  disabled?: Boolean;
  style?: any;

  variant?: 'solid' | 'outline' | 'text' | string;
  size?: 'small' | 'medium' | 'large' | string;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | string;
  block?: Boolean;
  loading?: Boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export type ChangeCallback = (value: string, e: any) => any;

export type InputProps = BoxProps & {
  autoFocus?: Boolean;
  readOnly?: Boolean;
  disabled?: Boolean;
  inputStyle?: JssStyles;
  labelStyle?: JssStyles;

  label?: string;
  error?: string;
  placeholder?: string;
  secure?: boolean;
  size?: 'small' | 'medium' | 'large' | string;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | string;

  onChange?: ChangeCallback;

  /** @deprecated use onChange instead */
  onChangeText?: Function;
};

export type SelectProps = InputProps & {
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
};

export type CheckboxProps = InputProps & {
  checked?: boolean;
};

export type CardProps = BoxProps;

export type ScrollableProps = BoxProps & {
  horizontal?: boolean;
};

export type ImageProps = BoxProps & {
  source: { uri?: string } | string | number;
  mode?: 'cover' | 'contain' | 'fill';
  width?: number | string;
  height?: number | string;
  corners?: number;
  rounded?: boolean;
};

export type DividerProps = BoxProps & {
  color?: string;
  size?: number | string;
  opacity?: number;
  vertical?: boolean;
};

export type ModalProps = BoxProps & {
  visible?: boolean;
  align?: 'center' | 'top' | 'bottom';
  onBackdropPress?: Function;
};

export type CollapseProps = BoxProps & {
  in?: boolean;
};

export type DropdownProps = BoxProps & {
  visible?: boolean;
};
