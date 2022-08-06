import { CSSProperties, ReactNode } from 'react';

export type FactoryProps = {
  map: any;
};

export type EventCallback = (e: any) => any;
export type ChangeCallback = (e: any, value: string) => any;

export type Bindings = {
  onPress?: Function;
  onPressIn?: Function;
  onPressOut?: Function;

  onFocus?: EventCallback;
  onBlur?: EventCallback;

  /** @deprecated use onPress instead */
  onClick?: EventCallback;
  /** @deprecated use onPressIn instead */
  onMouseDown?: EventCallback;
  /** @deprecated use onPressOut instead */
  onMouseUp?: EventCallback;
};

export type FlexJustifyValues = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
export type FlexAlignValues = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type ColorValues = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | string;
export type SizeValues = 'small' | 'medium' | 'large' | 'xlarge';

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

  corners?: number;

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

export type ThemeColorsProps = {
  main?: string;
  light?: string;
  dark?: string;
};

export type ThemeProps = {
  mode: 'light' | 'dark' | string;
  spacing?: Function;
  color?: Function;
  shape?: {
    borderRadius?: number;
    spacing?: number;
  };
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

export type BoxProps = Bindings &
  CustomStyles & {
    component?: any;
    className?: any;
    platform?: object;
    children?: ReactNode;
    style?: JssStyles;
    block?: JssStyles;
    hidden?: boolean;

    // Flexbox container
    flexbox?: boolean | 'flex' | 'flex-inline';
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    row?: boolean;
    column?: boolean;
    reverse?: boolean;
    wrap?: boolean | 'nowrap' | 'wrap' | 'wrap-reverse';
    noWrap?: boolean;
    flow?: string;
    justifyContent?: FlexJustifyValues;
    alignContent?: FlexAlignValues;
    justifyItems?: FlexJustifyValues;
    alignItems?: FlexAlignValues | 'baseline';
    center?: boolean;

    // Flexbox item
    flex?: boolean;
    order?: number;
    grow?: number;
    shrink?: number;
    basis?: 'auto' | number | string;
    align?: FlexAlignValues;
    justify?: FlexJustifyValues;
  };

export type TextProps = BoxProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title' | 'subtitle' | 'caption';
  size?: number;
  color?: ColorValues;
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

export type LabelProps = TextProps & {
  for?: string;
};

export type GroupProps = BoxProps & {
  id?: string;
  className?: string;
  disabled?: boolean;
  focused?: boolean;

  color?: ColorValues;
  error?: string;
  label?: string;
  loading?: boolean;
  size?: SizeValues;
  variant?: 'solid' | 'outline' | 'text';

  startIcon?: string | ReactNode;
  endIcon?: string | ReactNode;
  renderChildren?: Function;

  style?: JssStyles;
  labelStyle?: JssStyles;
  errorStyle?: JssStyles;
  containerStyle?: JssStyles;
};

export type ButtonProps = GroupProps & {
  autoFocus?: boolean;
};

export type ButtonGroupProps = BoxProps & {
  color?: ColorValues;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeValues;
  variant?: 'solid' | 'outline' | 'text' | string;
};

export type InputBaseProps = GroupProps & {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoFocus?: boolean;
  defaultValue?: string;
  name?: string;
  readOnly?: boolean;
  returnKeyType?: 'default' | 'done' | 'go' | 'next' | 'search' | 'send';
  placeholder?: string;
  onChange?: ChangeCallback;

  /** @deprecated use onChange instead */
  onChangeText?: Function;
};

export type InputProps = InputBaseProps & {
  autoCorrect?: boolean;
  caretHidden?: boolean;
  maxLength?: boolean;
  secure?: boolean;
  selectionColor?: string;
  type?: 'text' | 'number' | 'email' | 'phone' | 'url';
};

export type SelectProps = InputBaseProps & {
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
};

export type CheckboxProps = InputBaseProps & {
  checked?: boolean;
  unique?: boolean;
};

export type CardProps = BoxProps & {};

export type ScrollableProps = BoxProps & {
  horizontal?: boolean;
};

export type ImageProps = BoxProps & {
  source: { uri?: string } | string | number;
  mode?: 'cover' | 'contain' | 'fill';
  width?: number | string;
  height?: number | string;
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
  onBackdropPress?: EventCallback;
};

export type CollapseProps = BoxProps & {
  in?: boolean;
};

export type DropdownProps = BoxProps & {
  visible?: boolean;
};

export type IconProps = BoxProps & {
  color?: ColorValues;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  mirrored?: boolean;
  alt?: string;
};

export type LoadingProps = BoxProps & {
  speed: string;
};
