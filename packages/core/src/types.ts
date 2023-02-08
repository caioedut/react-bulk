import { CSSProperties, ReactNode, RefObject, SyntheticEvent } from 'react';

import { styleProps } from './styles/constants';

export type AnyObject = { [key: string]: any };
export type TimeoutType = ReturnType<typeof setTimeout> | null;
export type AnyCallback = (mixed: any) => any;
export type EventCallback = (event: any) => any;
export type InputValue = string | number | boolean | null | undefined;

export type RbkMap = {
  web: boolean;
  native: boolean;
  ios: boolean;
  android: boolean;

  useDimensions: () => { width: number; height: number };

  Animated: {
    View: ReactNode;
  };

  svg: {
    [key: string]: ReactNode;
  };

  [key: string]: ReactNode | any;
};

export interface RbkFormChangeEvent {
  type: string;
  data: AnyObject;
  name?: string;
  target?: ReactNode | any;
  nativeEvent?: Event | SyntheticEvent;
}

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

export type RbkRect = {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  pageOffsetX: number;
  pageOffsetY: number;
};

export type FactoryProps = {
  stylist?: RbkStyles | string | string[];
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
  onFormChange?: (event: RbkFormChangeEvent, data: AnyObject) => void;
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

export type FlexJustifyValues =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | string;
export type FlexAlignValues = 'flex-start' | 'flex-end' | 'center' | 'stretch' | string;
export type ColorValues = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | string;
export type SizeValues = number | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
export type TextTransformValues = 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | string;

export type RbkStyleProps = {
  position?: 'relative' | 'absolute' | string;

  // Flexbox container
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | string;
  justifyContent?: FlexJustifyValues;
  alignContent?: FlexAlignValues;
  justifyItems?: FlexJustifyValues;
  alignItems?: FlexAlignValues | 'baseline';

  // Flexbox item
  order?: number;
  grow?: number;
  shrink?: number;
  basis?: 'auto' | number | string;
  align?: FlexAlignValues;
  justify?: FlexJustifyValues;

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
} & Partial<{
  [K in typeof styleProps[number]]: any;
}>;

export type RbkStyles = (CSSProperties & RbkStyleProps) | Array<CSSProperties> | Array<RbkStyleProps> | Array<any> | any;

export type VariantProps = {
  [prop: string]: {
    [value: string]: {
      root?: RbkStyles;
      [name: string]: RbkStyles;
    };
  };
};

export type ThemeModeValues = 'light' | 'dark' | string;

export type ThemeColorsProps =
  | string
  | {
      main?: string;
      light?: string;
      lighter?: string;
      dark?: string;
      darker?: string;
    };

export type ThemeComponentProps = {
  name: string;
  defaultProps: AnyObject;
  defaultStyles: {
    root?: RbkStyles;
    [key: string]: RbkStyles;
  };
  variants: VariantProps;
};

export type ThemeProps = {
  mode: ThemeModeValues;

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

    scroll: AnyObject;

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
    ActionSheet: ThemeComponentProps & { defaultProps?: ActionSheetProps };
    Animation: ThemeComponentProps & { defaultProps?: AnimationProps };
    Backdrop: ThemeComponentProps & { defaultProps?: BackdropProps };
    Badge: ThemeComponentProps & { defaultProps?: BadgeProps };
    Box: ThemeComponentProps & { defaultProps?: BoxProps };
    Button: ThemeComponentProps & { defaultProps?: ButtonProps };
    ButtonGroup: ThemeComponentProps & { defaultProps?: ButtonGroupProps };
    Card: ThemeComponentProps & { defaultProps?: CardProps };
    Carousel: ThemeComponentProps & { defaultProps?: CarouselProps };
    Checkbox: ThemeComponentProps & { defaultProps?: CheckboxProps };
    Collapse: ThemeComponentProps & { defaultProps?: CollapseProps };
    Divider: ThemeComponentProps & { defaultProps?: DividerProps };
    Dropdown: ThemeComponentProps & { defaultProps?: DropdownProps };
    Form: ThemeComponentProps & { defaultProps?: FormProps };
    Grid: ThemeComponentProps & { defaultProps?: GridProps };
    Image: ThemeComponentProps & { defaultProps?: ImageProps };
    Input: ThemeComponentProps & { defaultProps?: InputProps };
    Label: ThemeComponentProps & { defaultProps?: LabelProps };
    Link: ThemeComponentProps & { defaultProps?: LinkProps };
    ListItem: ThemeComponentProps & { defaultProps?: ListItemProps };
    Loading: ThemeComponentProps & { defaultProps?: LoadingProps };
    Modal: ThemeComponentProps & { defaultProps?: ModalProps };
    Progress: ThemeComponentProps & { defaultProps?: ProgressProps };
    Scrollable: ThemeComponentProps & { defaultProps?: ScrollableProps };
    Select: ThemeComponentProps & { defaultProps?: SelectProps };
    Slider: ThemeComponentProps & { defaultProps?: SliderProps };
    Table: ThemeComponentProps & { defaultProps?: TableProps };
    Text: ThemeComponentProps & { defaultProps?: TextProps };
    Tooltip: ThemeComponentProps & { defaultProps?: TooltipProps };
  };
};

export type ThemeOptionalProps = Partial<ThemeProps>;

export type RbkTheme = ThemeProps & {
  setTheme: (options: ThemeModeValues | ThemeOptionalProps) => void;
};

export type BoxProps = {
  component?: any;
  id?: string;
  className?: any;
  platform?: object;
  accessibility?: AccessibilityProps;
  children?: ReactNode | any;
  invisible?: boolean;
  hidden?: boolean;
  componentProps?: AnyObject;
  noRootStyles?: boolean;

  // Styles
  style?: RbkStyles;
  rawStyle?: RbkStyles;

  // Flexbox container
  row?: boolean;
  column?: boolean;
  reverse?: boolean;
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse' | string;
  noWrap?: boolean;
  center?: boolean;

  // Flexbox item
  flex?: boolean;

  // To use only on children of Grid
  xs?: number | 'auto' | 'flex' | 'hide' | boolean;
  sm?: number | 'auto' | 'flex' | 'hide' | boolean;
  md?: number | 'auto' | 'flex' | 'hide' | boolean;
  lg?: number | 'auto' | 'flex' | 'hide' | boolean;
  xl?: number | 'auto' | 'flex' | 'hide' | boolean;
  xxl?: number | 'auto' | 'flex' | 'hide' | boolean;
} & PressableProps &
  RbkStyleProps;

export type TextProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title' | 'subtitle' | 'caption' | string;
  size?: number;
  color?: ColorValues;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  justify?: boolean;
  bold?: boolean;
  italic?: boolean;
  smallCaps?: boolean;
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | string;
  transform?: TextTransformValues;

  numberOfLines?: number;
} & BoxProps;

export type LabelProps = {
  for?: string | RefObject<ReactNode>;
} & TextProps;

export type ButtonProps = {
  badge?: number | BadgeProps;
  color?: ColorValues;
  disabled?: boolean;
  endAddon?: ReactNode;
  href?: string;
  label?: string;
  loading?: boolean;
  circular?: boolean;
  size?: SizeValues;
  startAddon?: ReactNode;
  transform?: TextTransformValues;
  type?: 'button' | 'submit' | 'cancel' | 'clear' | string;
  variant?: 'solid' | 'outline' | 'text' | string;
  // Styles
  contentStyle?: RbkStyles;
  labelStyle?: RbkStyles;

  /** @deprecated use startAddon instead */
  startIcon?: ReactNode;
  /** @deprecated use endAddon instead */
  endIcon?: ReactNode;
} & PressableProps &
  FocusableProps &
  BoxProps;

export type ButtonGroupProps = {
  color?: ColorValues;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeValues;
  variant?: 'solid' | 'outline' | 'text' | string;
  // Styles
  contentStyle?: RbkStyles;
} & BoxProps;

export type InputProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | string;
  autoCorrect?: boolean;
  caretHidden?: boolean;
  color?: ColorValues;
  controlled?: boolean;
  defaultValue?: InputValue;
  disabled?: boolean;
  endAddon?: ReactNode;
  error?: string;
  label?: string;
  mask?: (value: InputValue, data: AnyObject) => InputValue;
  maxLength?: number;
  multiline?: boolean;
  name?: string;
  notNull?: boolean;
  placeholder?: string;
  placeholderColor?: ColorValues;
  readOnly?: boolean;
  returnKeyType?: 'default' | 'done' | 'go' | 'next' | 'search' | 'send' | string;
  secure?: boolean;
  selectionColor?: ColorValues;
  size?: SizeValues;
  startAddon?: ReactNode;
  textColor?: ColorValues;
  type?: 'text' | 'number' | 'email' | 'phone' | 'url' | 'hidden' | string;
  unmask?: (InputValue: string, data: AnyObject) => InputValue;
  value?: InputValue;
  // Events
  onChange?: (event: RbkEvent, value: string) => void;
  onFormChange?: (event: RbkFormChangeEvent, data: AnyObject) => void;
  // Styles
  contentStyle?: RbkStyles;
  errorStyle?: RbkStyles;
  labelStyle?: RbkStyles;
  inputStyle?: RbkStyles;

  /** @deprecated use startAddon instead */
  startIcon?: ReactNode;
  /** @deprecated use endAddon instead */
  endIcon?: ReactNode;

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
  [key: string]: any;
};

export type SelectProps = {
  color?: ColorValues;
  controlled?: boolean;
  defaultValue?: InputValue;
  disabled?: boolean;
  endAddon?: ReactNode;
  error?: string;
  label?: string;
  loading?: boolean;
  name?: string;
  options?: SelectOption[];
  placeholder?: string;
  readOnly?: boolean;
  size?: SizeValues;
  startAddon?: ReactNode;
  value?: InputValue;
  // Events
  onChange?: (event: RbkEvent, value: string, option: SelectOption) => void;
  onFormChange?: (event: RbkFormChangeEvent, data: AnyObject) => void;
  // Styles
  buttonStyle?: RbkStyles;
  errorStyle?: RbkStyles;
  labelStyle?: RbkStyles;

  /** @deprecated use startAddon instead */
  startIcon?: ReactNode;
  /** @deprecated use endAddon instead */
  endIcon?: ReactNode;
} & FocusableProps &
  BoxProps;

export type CheckboxProps = {
  checked?: boolean;
  controlled?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  readOnly?: boolean;
  size?: SizeValues;
  unique?: boolean;
  // Events
  onChange?: (event: { checked: boolean } & Omit<RbkEvent, 'value'>, checked: boolean) => void;
  onFormChange?: (event: RbkFormChangeEvent, data: AnyObject) => void;
  // Styles
  buttonStyle?: RbkStyles;
  labelStyle?: RbkStyles;
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
  onFormChange?: (event: RbkFormChangeEvent, data: AnyObject) => void;
} & FocusableProps &
  BoxProps;

export type CardProps = BoxProps;

export type CarouselProps = {
  chevron?: 'visible' | 'hidden';
  color?: ColorValues;
  gap?: number;
  pagingEnabled?: boolean;
  swipe?: false;
  // Column Count
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  // Styles
  chevronStyle?: { color?: ColorValues; size?: number } & RbkStyles;
} & BoxProps;

export type ScrollableProps = {
  contentInset?: number;
  direction?: 'vertical' | 'horizontal' | string;
  hideScrollBar?: boolean;

  /** Note: vertical pagination is not supported on Android. **/
  pagingEnabled?: boolean;

  // Styles
  contentStyle?: RbkStyles;
} & BoxProps;

export type ImageProps = {
  source: { uri?: string } | string | number;
  alt?: string;
  circular?: boolean;
  mode?: 'cover' | 'contain' | 'fill' | string;
  width?: number | string;
  height?: number | string;
  // Events
  onLoad?: EventCallback;
  onError?: EventCallback;
} & BoxProps;

export type DividerProps = {
  color?: ColorValues;
  opacity?: number;
  size?: number | string;
  vertical?: boolean;
} & BoxProps;

export type BackdropProps = {
  visible?: boolean;
} & BoxProps;

export type ModalProps = {
  halign?: 'center' | 'left' | 'right' | string;
  valign?: 'center' | 'top' | 'bottom' | string;
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
  // Styles
  labelStyle?: RbkStyles;
} & AnimationProps;

export type GridProps = {
  gap?: number;
  size?: number;
} & BoxProps;

export type TableProps = {
  columns: {
    header?: ReactNode | AnyCallback | string;
    content?: ReactNode | AnyCallback | string;
    style?: RbkStyles;
  }[];
  rows?: any[] | any;
} & BoxProps;

export type BadgeProps = {
  value?: number;
  size?: SizeValues;
  dot?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  // Styles
  labelStyle?: RbkStyles;
} & TextProps;

export type FormProps = {
  data?: any;
  onSubmit?: (event: FormRef, data: AnyObject) => any;
  onCancel?: (event: FormRef) => any;
  onClear?: (event: FormRef, data: AnyObject) => any;
  onChange?: (event: FormRef, data: AnyObject) => void;
} & BoxProps;

export type TooltipProps = {
  color?: 'black' | 'white' | ColorValues;
  position?: 'top' | 'bottom' | 'left' | 'right' | string;
  title?: string;
  visible?: boolean;
} & BoxProps;

export type ActionSheetProps = {
  visible?: boolean;
  // Events
  onClose?: EventCallback;
} & BoxProps;

export type AnimationProps = {
  delay?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string;
  from?: RbkStyles;
  in?: boolean;
  loop?: boolean | number;
  speed?: number;
  timing?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  to?: RbkStyles;
} & BoxProps;

export type ProgressProps = {
  color?: ColorValues;
  size?: number;
} & BoxProps;

export type ListItemProps = {
  chevron?: boolean | ReactNode;
  endAddon?: ReactNode;
  gap?: number;
  startAddon?: ReactNode;
  // Styles
  chevronStyle?: {
    size?: number;
    color?: ColorValues;
  } & RbkStyles;

  /** @deprecated use startAddon instead */
  startIcon?: ReactNode;
  /** @deprecated use endAddon instead */
  endIcon?: ReactNode;
} & BoxProps;

export type LinkProps = {
  underline?: boolean;
} & BoxProps;
