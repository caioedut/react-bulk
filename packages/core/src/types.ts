import { CSSProperties, ReactNode, RefObject, SyntheticEvent } from 'react';

export type AnyObject = { [key: string]: any };
export type TimeoutType = ReturnType<typeof setTimeout> | null;
export type AnyCallback = (mixed: any) => any;
export type EventCallback = (event: any) => any;
export type InputValue = string | number | boolean;

export interface RbkEvent {
  type: string;
  value: InputValue;
  name?: string;
  target?: ReactNode | any;
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => void;
  nativeEvent?: Event | SyntheticEvent;
}

export type MapType = {
  web: boolean;
  native: boolean;
  ios: boolean;
  android: boolean;

  dimensions: {
    height: number;
    width: number;
  };

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

export type RectType = {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  pageOffsetX: number;
  pageOffsetY: number;
};

export type FactoryProps = {
  map: MapType;
  innerRef?: RefObject<any>;
  defaults?: AnyObject;
  stylist?: JssStyles | string | string[];
} & any;

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
  pressable?: boolean;
  onPress?: Function;
  onPressIn?: Function;
  onPressOut?: Function;

  /** @deprecated use onPress(event) instead */
  onClick?: EventCallback;
  /** @deprecated use onPressIn(event) instead */
  onMouseDown?: EventCallback;
  /** @deprecated use onPressOut(event) instead */
  onMouseUp?: EventCallback;
};

export type FocusableProps = {
  autoFocus?: boolean;
  blur?: Function;
  focus?: Function;
  isFocused?: () => boolean;
  // Events
  onBlur?: EventCallback;
  onFocus?: EventCallback;
};

export type FormField = {
  name: string;
  get: () => InputValue | null | undefined;
  set: (value: InputValue) => void;
};

export type FormRef = {
  cancel: () => void;
  clear: () => void;
  getData: () => AnyObject;
  setData: (data: AnyObject) => void;
  getValue: (name: string) => InputValue | undefined;
  setValue: (name: string, value: InputValue) => void;
  submit: () => void;
  target: ReactNode;
  getField: (name: string) => FormField | null | undefined;
  setField: (options: FormField) => void;
  unsetField: (name: string) => void;
};

export type FlexJustifyValues = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlignValues = 'flex-start' | 'flex-end' | 'center' | 'stretch';
export type ColorValues = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | string;
export type SizeValues = number | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type TextTransformValues = 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width';

export type CustomStyles = {
  position?: 'relative' | 'absolute';

  h?: number | string;
  w?: number | string;

  minw?: number | string;
  maxw?: number | string;

  minh?: number | string;
  maxh?: number | string;

  bg?: string;
  border?: string | number | boolean;
  corners?: number;
  shadow?: string;

  i?: number | string;
  t?: number | string;
  b?: number | string;
  l?: number | string;
  r?: number | string;
  m?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  mh?: number | string;
  mx?: number | string;
  mv?: number | string;
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

export type ThemeMode = 'light' | 'dark' | string;

export type ThemeColorsProps =
  | string
  | {
      main?: string;
      light?: string;
      dark?: string;
    };

export type ThemeComponentProps = {
  name: string;
  variants: AnyObject;
  defaultProps: AnyObject;
  defaultStyles: {
    root?: JssStyles;
    [key: string]: JssStyles;
  };
};

export type ThemeProps = {
  mode: ThemeMode;

  shape: {
    borderRadius: number;
    spacing: number;
  };

  typography: {
    fontSize: number;
    lineHeight: number;
  };

  colors: {
    primary: ThemeColorsProps;
    secondary: ThemeColorsProps;
    info: ThemeColorsProps;
    success: ThemeColorsProps;
    warning: ThemeColorsProps;
    error: ThemeColorsProps;

    common: {
      trans: string;
      black: string;
      white: string;
      gray: string;
    };

    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };

    background: {
      primary: string;
      secondary: string;
      disabled: string;
    };

    [key: string]: ThemeColorsProps | any;
  };

  mixins: {
    transitions: {
      slow: AnyObject;
      medium: AnyObject;
      fast: AnyObject;
    };

    zIndex: {
      backdrop: number;
      modal: number;
      dropdown: number;
      tooltip: number;
    };
  };

  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };

  rem: Readonly<Function>;
  spacing: Readonly<Function>;
  color: Readonly<Function>;
  hex2rgba: Readonly<Function>;
  rgba2hex: Readonly<Function>;
  contrast: Readonly<Function>;

  components: {
    Animation: ThemeComponentProps;
    Backdrop: ThemeComponentProps;
    Badge: ThemeComponentProps;
    Box: ThemeComponentProps;
    Button: ThemeComponentProps;
    ButtonGroup: ThemeComponentProps;
    Card: ThemeComponentProps;
    Checkbox: ThemeComponentProps;
    Collapse: ThemeComponentProps;
    Divider: ThemeComponentProps;
    Dropdown: ThemeComponentProps;
    Form: ThemeComponentProps;
    Grid: ThemeComponentProps;
    Group: ThemeComponentProps;
    Icon: ThemeComponentProps;
    Image: ThemeComponentProps;
    Input: ThemeComponentProps;
    Label: ThemeComponentProps;
    Link: ThemeComponentProps;
    ListItem: ThemeComponentProps;
    Loading: ThemeComponentProps;
    Modal: ThemeComponentProps;
    Progress: ThemeComponentProps;
    Scrollable: ThemeComponentProps;
    Select: ThemeComponentProps;
    Slider: ThemeComponentProps;
    Table: ThemeComponentProps;
    Text: ThemeComponentProps;
    Tooltip: ThemeComponentProps;
  };
};

export type ThemeOptionalProps = Partial<ThemeProps>;

export type BoxProps = {
  component?: any;
  id?: string;
  className?: any;
  platform?: object;
  accessibility?: AccessibilityProps;
  children?: ReactNode;
  invisible?: boolean;
  hidden?: boolean;
  componentProps?: AnyObject;
  noRootStyles?: boolean;

  // Styles
  style?: JssStyles;
  rawStyle?: JssStyles;

  // Flexbox container
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  row?: boolean;
  column?: boolean;
  reverse?: boolean;
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
  noWrap?: boolean;
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

  // To use only on children of Grid
  xs?: number | true | 'auto';
  sm?: number | true | 'auto';
  md?: number | true | 'auto';
  lg?: number | true | 'auto';
  xl?: number | true | 'auto';
  xxl?: number | true | 'auto';
} & PressableProps &
  CustomStyles;

export type TextProps = {
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
  transform?: TextTransformValues;

  numberOfLines?: number;
} & BoxProps;

export type LabelProps = {
  for?: string | RefObject<ReactNode>;
} & TextProps;

export type FormControlProps = {
  color?: ColorValues;
  endIcon?: ReactNode;
  label?: string;
  size?: SizeValues;
  startIcon?: ReactNode;
  // Styles
  labelStyle?: JssStyles;
};

export type ButtonProps = FormControlProps & {
  badge?: number | BadgeProps;
  disabled?: boolean;
  href?: string;
  icon?: boolean | string | ReactNode;
  loading?: boolean;
  rounded?: boolean;
  transform?: TextTransformValues;
  type?: 'button' | 'submit' | 'cancel' | 'clear';
  variant?: 'solid' | 'outline' | 'text';
  // Styles
  contentStyle?: JssStyles;
} & FocusableProps &
  BoxProps;

export type ButtonGroupProps = {
  color?: ColorValues;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeValues;
  variant?: 'solid' | 'outline' | 'text';
  // Styles
  contentStyle?: JssStyles;
} & BoxProps;

export type InputProps = FormControlProps & {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  caretHidden?: boolean;
  defaultValue?: InputValue;
  disabled?: boolean;
  error?: string;
  mask?: (value: InputValue, data: AnyObject) => InputValue;
  maxLength?: number;
  multiline?: boolean;
  name?: string;
  placeholder?: string;
  placeholderColor?: ColorValues;
  readOnly?: boolean;
  returnKeyType?: 'default' | 'done' | 'go' | 'next' | 'search' | 'send';
  secure?: boolean;
  selectionColor?: ColorValues;
  type?: 'text' | 'number' | 'email' | 'phone' | 'url';
  unmask?: (InputValue: string, data: AnyObject) => InputValue;
  value?: InputValue;
  // Events
  onChange?: (event: RbkEvent, value: string) => void;
  // Styles
  containerStyle?: JssStyles;
  errorStyle?: JssStyles;
  inputStyle?: JssStyles;

  /** @deprecated use onChange(event, value) instead */
  onInput?: Function;
  /** @deprecated use onChange(event, value) instead */
  onChangeText?: Function;
} & FocusableProps &
  BoxProps;

export type SelectOption = {
  label: string;
  value: InputValue;
  disabled?: boolean;
};

export type SelectProps = FormControlProps & {
  defaultValue?: InputValue;
  disabled?: boolean;
  error?: string;
  loading?: boolean;
  name?: string;
  options?: SelectOption[];
  placeholder?: string;
  readOnly?: boolean;
  value?: InputValue;
  // Events
  onChange?: (event: RbkEvent, value: string, option: SelectOption) => void;
  // Styles
  buttonStyle?: JssStyles;
  errorStyle?: JssStyles;
} & FocusableProps &
  BoxProps;

export type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  readOnly?: boolean;
  unique?: boolean;
  // Events
  onChange?: (event: { checked: boolean } & Omit<RbkEvent, 'value'>, checked: boolean) => void;
} & FocusableProps &
  BoxProps;

export type SliderProps = {
  defaultValue?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  name?: string;
  readOnly?: boolean;
  size?: SizeValues;
  value?: number;
  // Events
  onChange?: (event: AnyObject, value: number) => any;
  onSlide?: (event: AnyObject, value: number, percent: number) => any;
} & FocusableProps &
  BoxProps;

export type CardProps = BoxProps;

export type ScrollableProps = {
  direction?: 'vertical' | 'horizontal';
  contentInset?: number;
  // Styles
  contentStyle?: JssStyles;
} & BoxProps;

export type ImageProps = {
  source: { uri?: string } | string | number;
  alt?: string;
  mode?: 'cover' | 'contain' | 'fill';
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
} & BoxProps;

export type DividerProps = {
  color?: ColorValues;
  size?: number | string;
  opacity?: number;
  vertical?: boolean;
} & BoxProps;

export type BackdropProps = {
  visible?: boolean;
} & BoxProps;

export type ModalProps = {
  halign?: 'center' | 'left' | 'right';
  valign?: 'center' | 'top' | 'bottom';
  visible?: boolean;
  onBackdropPress?: EventCallback;
} & BoxProps;

export type CollapseProps = {
  in?: boolean;
} & BoxProps;

export type DropdownProps = {
  visible?: boolean;
} & BoxProps;

export type LoadingProps = {
  color?: ColorValues;
  label?: string;
  size?: number;
} & AnimationProps;

export type GridProps = {
  gap?: number;
  size?: number;
} & BoxProps;

export type TableProps = {
  columns: {
    header?: ReactNode | AnyCallback | string;
    content?: ReactNode | AnyCallback | string;
    style?: JssStyles;
  }[];
  rows: any[];
} & BoxProps;

export type BadgeProps = {
  value?: number;
  size?: SizeValues;
  dot?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
} & TextProps;

export type FormProps = {
  data?: any;
  onSubmit?: (event: FormRef, data: AnyObject) => any;
  onCancel?: (event: FormRef) => any;
  onClear?: (event: FormRef, data: AnyObject) => any;
} & BoxProps;

export type TooltipProps = {
  color?: 'black' | 'white' | ColorValues;
  position?: 'top' | 'bottom' | 'left' | 'right';
  title?: string;
  visible?: boolean;
} & BoxProps;

export type AnimationProps = {
  delay?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  from?: JssStyles;
  in?: boolean;
  loop?: boolean | number;
  speed?: number;
  to?: JssStyles;
} & BoxProps;

export type ProgressProps = {
  color?: ColorValues;
  size?: number;
} & BoxProps;

export type ListItemProps = {
  chevron?: boolean | string | ReactNode;
  endIcon?: string | ReactNode;
  gap?: number;
  icon?: string | ReactNode;
  startIcon?: string | ReactNode;
  // Styles
  chevronStyle?: JssStyles;
  iconStyle?: JssStyles;
  startIconStyle?: JssStyles;
  endIconStyle?: JssStyles;
} & BoxProps;

export type LinkProps = {
  underline?: boolean;
} & BoxProps;
