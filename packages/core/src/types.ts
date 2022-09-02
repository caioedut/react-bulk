import { CSSProperties, ReactNode } from 'react';

export type TimeoutType = ReturnType<typeof setInterval> | null;
export type AnyCallback = (mixed: any) => any;
export type EventCallback = (e: any) => any;
export type ChangeCallback = (e: any, value: string) => any;
export type SubmitCallback = (e: any, data: any) => any;

export type MapType = {
  web: boolean;
  native: boolean;
  ios: boolean;
  android: boolean;

  dimensions: {
    height: number;
    width: number;
  };

  Icons: any;

  Button: ReactNode | any;
  Image: ReactNode | any;
  Input: ReactNode | any;
  Label: ReactNode | any;
  Link: ReactNode | any;
  ScrollView: ReactNode | any;
  Text: ReactNode | any;
  TextArea: ReactNode | any;
  View: ReactNode | any;
};

export type FactoryProps = any & {
  map: MapType;
  stylist?: JssStyles | string | string[];
};

export type AccessibilityProps = {
  accessible?: boolean;
  hint?: string;
  label?: string;
  role?:
    | 'none'
    | 'button'
    | 'link'
    | 'search'
    | 'image'
    | 'alert'
    | 'checkbox'
    | 'combobox'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'scrollbar'
    | 'spinbutton'
    | 'switch'
    | 'tab'
    | 'tablist'
    | 'timer'
    | 'toolbar';
  state?: {
    checked: boolean | any;
    disabled: boolean;
    expanded: boolean;
    selected: boolean;
    busy: boolean;
  };
  value?: {
    max: number;
    min: number;
    now: number;
    text: string;
  };
};

export type PressableProps = {
  onPress?: Function;
  onPressIn?: Function;
  onPressOut?: Function;

  /** @deprecated use onPress instead */
  onClick?: EventCallback;
  /** @deprecated use onPressIn instead */
  onMouseDown?: EventCallback;
  /** @deprecated use onPressOut instead */
  onMouseUp?: EventCallback;
};

export type FocusableProps = {
  autoFocus?: boolean;
  onFocus?: EventCallback;
  onBlur?: EventCallback;
};

export type EditableProps = {
  defaultValue?: string;
  value?: string;
  onChange?: ChangeCallback;

  /** @deprecated use onChange instead */
  onInput?: Function;
  /** @deprecated use onChange instead */
  onChangeText?: Function;
};

export type FlexJustifyValues = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
export type FlexAlignValues = 'flex-start' | 'flex-end' | 'center' | 'stretch';
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
  border?: string | number;
  corners?: number;
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

export type ThemeColorsProps = {
  main?: string;
  light?: string;
  dark?: string;
};

export type ThemeComponentProps = {
  name: string;
  defaultProps: {};
};

export type ThemeProps = {
  mode?: 'light' | 'dark' | string;
  spacing?: Readonly<Function>;
  color?: Readonly<Function>;
  rem?: Readonly<Function>;
  hex2rgba?: Readonly<Function>;
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
  components?: {
    Badge?: ThemeComponentProps;
    Box?: ThemeComponentProps;
    Button?: ThemeComponentProps;
    ButtonGroup?: ThemeComponentProps;
    Card?: ThemeComponentProps;
    Checkbox?: ThemeComponentProps;
    Collapse?: ThemeComponentProps;
    Divider?: ThemeComponentProps;
    Dropdown?: ThemeComponentProps;
    Grid?: ThemeComponentProps;
    Group?: ThemeComponentProps;
    Icon?: ThemeComponentProps;
    Image?: ThemeComponentProps;
    Input?: ThemeComponentProps;
    Label?: ThemeComponentProps;
    Loading?: ThemeComponentProps;
    Modal?: ThemeComponentProps;
    Scrollable?: ThemeComponentProps;
    Select?: ThemeComponentProps;
    Table?: ThemeComponentProps;
    Text?: ThemeComponentProps;
  };
};

export type BoxProps = PressableProps &
  CustomStyles & {
    component?: any;
    id?: string;
    className?: any;
    platform?: object;
    accessibility?: AccessibilityProps;
    children?: ReactNode;
    invisible?: boolean;
    style?: JssStyles;
    rawStyle?: JssStyles;
    block?: boolean;
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
  smallCaps?: boolean;
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

  // To use only on children of Grid
  xs?: number | true | 'auto';
  sm?: number | true | 'auto';
  md?: number | true | 'auto';
  lg?: number | true | 'auto';
  xl?: number | true | 'auto';
  xxl?: number | true | 'auto';
};

export type ButtonProps = GroupProps &
  FocusableProps & {
    badge?: number | BadgeProps;
    href?: string;
    type?: 'button' | 'submit';
  };

export type ButtonGroupProps = BoxProps & {
  color?: ColorValues;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeValues;
  variant?: 'solid' | 'outline' | 'text' | string;
};

export type InputBaseProps = GroupProps &
  FocusableProps &
  EditableProps & {
    name?: string;
    readOnly?: boolean;
    returnKeyType?: 'default' | 'done' | 'go' | 'next' | 'search' | 'send';
    placeholder?: string;
  };

export type InputProps = InputBaseProps & {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  caretHidden?: boolean;
  maxLength?: number;
  multiline?: boolean;
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
  direction?: 'vertical' | 'horizontal';
};

export type ImageProps = BoxProps & {
  source: { uri?: string } | string | number;
  alt?: string;
  mode?: 'cover' | 'contain' | 'fill';
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
  alt?: string;
  color?: ColorValues;
  mirrored?: boolean;
  name: string;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
};

export type LoadingProps = BoxProps & {
  color?: ColorValues;
  label?: string;
  size?: number;
  speed?: string;
};

export type GridProps = BoxProps & {
  gap?: number;
  size?: number;
};

export type TableProps = BoxProps & {
  columns: [
    {
      header?: ReactNode | AnyCallback | string;
      content?: ReactNode | AnyCallback | string;
      style?: JssStyles;
    },
  ];
  rows: any[];
};

export type BadgeProps = TextProps & {
  value?: number;
  size?: SizeValues;
  dot?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
};

export type FormProps = BoxProps & {
  data?: any;
  onSubmit?: SubmitCallback;
};

export type TooltipProps = BoxProps & {
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: 'black' | 'white' | ColorValues;
};
