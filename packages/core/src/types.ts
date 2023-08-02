import { CSSProperties, ReactNode, RefObject, SyntheticEvent } from 'react';

import { styleProps } from './styles/constants';

export type ReactElement = ReactNode | ReactNode[] | JSX.Element | JSX.Element[];

export type AnyObject = { [key: string | number]: any };

export type TimeoutType = ReturnType<typeof setTimeout> | null;

export type AnyCallback = (...args: any[]) => any;

export type EventCallback = (event: any) => any;

export type InputValue = any;

export type RequiredSome<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P];
};

export type RbkMap = {
  web: boolean;
  native: boolean;
  ios: boolean;
  android: boolean;

  useDimensions: () => { width: number; height: number };

  Animated: {
    View: ReactElement;
  };

  svg: {
    [key: string]: ReactElement;
  };

  [key: string]: ReactElement | any;
};

/** @deprecated use RbkInputEvent instead */
export interface RbkEvent extends RbkInputEvent {}

/** @deprecated use RbkInputEvent instead */
export interface RbkChangeEvent extends RbkInputEvent {}

/** @deprecated use RbkFormEvent instead */
export interface RbkFormChangeEvent extends RbkFormEvent {}

export interface RbkFormEvent {
  name?: string;
  type: string;
  form: FormRef;
  target: ReactElement | any;
  nativeEvent?: Event | SyntheticEvent;
}

export interface RbkInputEvent {
  type: string;
  value: InputValue;
  name?: string;
  target: ReactElement | any;
  form?: FormRef;
  focus: () => any;
  blur: () => any;
  clear: () => any;
  isFocused: () => any;
  nativeEvent?: Event | SyntheticEvent;
}

export interface RbkCheckboxEvent extends Omit<RbkInputEvent, 'value'> {
  checked: boolean;
}

export type RbkRect = {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  pageOffsetX: number;
  pageOffsetY: number;
};

export type RbkAnimation = {
  boomerang?: boolean;
  delay?: number;
  speed?: number;
  timing?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  iterations?: number | 'infinite';
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
    checked?: boolean | any;
    disabled?: boolean;
    expanded?: boolean;
    selected?: boolean;
    busy?: boolean;
  };
  value?: {
    max?: number;
    min?: number;
    now?: number;
    text?: string;
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
  set: (value: InputValue) => any;
  setError?: (error: boolean | string) => any;
  onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
};

export type FormRef = {
  cancel: () => any;
  clear: () => any;
  getData: () => AnyObject;
  setData: (data: AnyObject) => any;
  setErrors: (errors: FormProps['errors']) => any;
  getValue: (name: string) => InputValue | undefined;
  setValue: (name: string, value: InputValue) => any;
  submit: () => any;
  target: ReactElement;
  getField: (name: string) => FormField | null | undefined;
  setField: (options: FormField) => any;
  unsetField: (name: string) => any;
};

export type RbkColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | (string & {});

export type SizeValues = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | (number & {});

export type TextTransformValues = 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width';

export type FlexJustifyValues =
  | 'center'
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  // Aliases
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export type FlexAlignValues =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  // Aliases
  | 'start'
  | 'end';

export type RbkStyleProps = {
  position?: 'relative' | 'absolute' | (string & {});

  // Flexbox container
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: FlexJustifyValues;
  alignContent?: FlexAlignValues;
  justifyItems?: FlexJustifyValues;
  alignItems?: FlexAlignValues | 'baseline';

  // Flexbox item
  order?: number;
  grow?: number;
  shrink?: number;
  basis?: 'auto' | (string & {}) | (number & {});
  align?: FlexAlignValues;
  justify?: FlexJustifyValues;

  h?: number | string | true;
  w?: number | string | true;
  minw?: number | string | true;
  maxw?: number | string | true;
  minh?: number | string | true;
  maxh?: number | string | true;
  hh?: number | string | true;
  ww?: number | string | true;

  bg?: string;
  border?: string | number | boolean;
  corners?: number;
  shadow?: number;

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
  [K in (typeof styleProps)[number]]: any;
}>;

export type RbkStyles = (CSSProperties & RbkStyleProps) | (CSSProperties & RbkStyleProps)[] | any[] | any;

export type ThemeModeValues = 'light' | 'dark';

export type ThemeColorsProps =
  | {
      main?: string;
      light?: string;
      lighter?: string;
      dark?: string;
      darker?: string;
    }
  | (string & {});

export type ThemeComponentStyleContexts<Contexts extends keyof any> = {
  [context in Contexts | 'root']: RbkStyles;
};

export type ThemeComponentProps<Props, Contexts extends keyof any> = {
  name: string;
  defaultProps: Partial<Props>;
  defaultStyles: ThemeComponentStyleContexts<Contexts>;
  variants?: {
    [prop: string]: {
      [value: string]: Partial<ThemeComponentStyleContexts<Contexts>>;
    };
  };
};

export type ThemeProps = {
  mode: ThemeModeValues;

  custom: AnyObject;

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

    gray: ThemeColorsProps;
    red: ThemeColorsProps;
    orange: ThemeColorsProps;
    amber: ThemeColorsProps;
    yellow: ThemeColorsProps;
    lime: ThemeColorsProps;
    green: ThemeColorsProps;
    teal: ThemeColorsProps;
    cyan: ThemeColorsProps;
    blue: ThemeColorsProps;
    indigo: ThemeColorsProps;
    violet: ThemeColorsProps;
    purple: ThemeColorsProps;
    fuchsia: ThemeColorsProps;
    pink: ThemeColorsProps;

    common: {
      trans: string;
      black: string;
      white: string;
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
      toaster: number;
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

  rem: (multiplier?: number, base?: number | null) => number;
  spacing: (multiplier?: number) => number;
  color: (key: RbkColor, alpha?: number) => string;
  hex2rgba: (hex: string, alpha?: number) => string;
  rgba2hex: (rgba: string) => string;
  contrast: (color: string, lightColor?: string | null, darkColor?: string | null) => string;

  components: {
    ActionSheet: ThemeComponentProps<ActionSheetProps, 'root'>;
    Animation: ThemeComponentProps<AnimationProps, 'root'>;
    Backdrop: ThemeComponentProps<BackdropProps, 'root'>;
    Badge: ThemeComponentProps<BadgeProps, 'root' | 'label'>;
    Box: ThemeComponentProps<BoxProps, 'root'>;
    Button: ThemeComponentProps<ButtonProps, 'root' | 'label'>;
    ButtonGroup: ThemeComponentProps<ButtonGroupProps, 'root' | 'content'>;
    Card: ThemeComponentProps<CardProps, 'root'>;
    Carousel: ThemeComponentProps<CarouselProps, 'root' | 'content' | 'chevron'>;
    Checkbox: ThemeComponentProps<CheckboxProps, 'root' | 'button'>;
    Collapse: ThemeComponentProps<CollapseProps, 'root'>;
    Divider: ThemeComponentProps<DividerProps, 'root'>;
    Drawer: ThemeComponentProps<DrawerProps, 'root' | 'backdrop'>;
    Dropdown: ThemeComponentProps<DropdownProps, 'root'>;
    Form: ThemeComponentProps<FormProps, 'root'>;
    Grid: ThemeComponentProps<GridProps, 'root' | 'item'>;
    Image: ThemeComponentProps<ImageProps, 'root'>;
    Input: ThemeComponentProps<InputProps, 'root' | 'content' | 'label' | 'input' | 'error'>;
    Label: ThemeComponentProps<LabelProps, 'root'>;
    Link: ThemeComponentProps<LinkProps, 'root'>;
    ListItem: ThemeComponentProps<ListItemProps, 'root'>;
    Loading: ThemeComponentProps<LoadingProps, 'root' | 'label'>;
    Modal: ThemeComponentProps<ModalProps, 'root'>;
    Outline: ThemeComponentProps<OutlineProps, 'root'>;
    Progress: ThemeComponentProps<ProgressProps, 'root' | 'bar' | 'label'>;
    Scrollable: ThemeComponentProps<ScrollableProps, 'root' | 'content'>;
    Select: ThemeComponentProps<SelectProps, 'root' | 'label' | 'error'>;
    Slider: ThemeComponentProps<SliderProps, 'root' | 'rule' | 'bar' | 'thumb'>;
    Table: ThemeComponentProps<TableProps, 'root'>;
    Tabs: ThemeComponentProps<TabsProps, 'root' | 'content' | 'button' | 'active'>;
    Text: ThemeComponentProps<TextProps, 'root'>;
    Tooltip: ThemeComponentProps<TooltipProps, 'root'>;
  };
};

export type ThemeEditProps = RecursivePartial<ThemeProps>;

/** @deprecated use ThemeEditProps instead */
export type ThemeOptionalProps = RecursivePartial<ThemeProps>;

export type RbkTheme = ThemeProps & {
  setTheme: (options: ThemeModeValues | ThemeEditProps) => any;
};

export type BoxProps = {
  id?: string;
  className?: any;
  platform?: object;
  accessibility?: AccessibilityProps;
  children?: ReactElement | any;
  invisible?: boolean;
  hidden?: boolean;

  mount?: boolean;
  component?: any;
  componentProps?: AnyObject;
  noRootStyles?: boolean;

  // Styles
  style?: RbkStyles;
  rawStyle?: RbkStyles;

  // Flexbox container
  row?: boolean;
  column?: boolean;
  reverse?: boolean;
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
  noWrap?: boolean;
  center?: boolean;

  // Flexbox item
  flex?: boolean;

  // To use only on children of Grid
  xs?: 'auto' | 'flex' | 'hide' | (number & {}) | (boolean | {});
  sm?: 'auto' | 'flex' | 'hide' | (number & {}) | (boolean | {});
  md?: 'auto' | 'flex' | 'hide' | (number & {}) | (boolean | {});
  lg?: 'auto' | 'flex' | 'hide' | (number & {}) | (boolean | {});
  xl?: 'auto' | 'flex' | 'hide' | (number & {}) | (boolean | {});
  xxl?: 'auto' | 'flex' | 'hide' | (number & {}) | (boolean | {});
} & PressableProps &
  RbkStyleProps;

export type TextProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title' | 'subtitle' | 'primary' | 'secondary' | 'caption';
  size?: number;
  color?: RbkColor;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  justify?: boolean;
  bold?: boolean;
  italic?: boolean;
  smallCaps?: boolean;
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | (string & {});
  transform?: TextTransformValues;
  numberOfLines?: number;
} & BoxProps;

export type LabelProps = {
  for?: string | RefObject<ReactElement>;
} & TextProps;

export type ButtonProps = {
  badge?: number | BadgeProps;
  color?: RbkColor;
  disabled?: boolean;
  endAddon?: ReactElement;
  href?: string;
  label?: string;
  loading?: boolean;
  circular?: boolean;
  size?: SizeValues;
  startAddon?: ReactElement;
  transform?: TextTransformValues;
  type?: 'button' | 'submit' | 'cancel' | 'clear';
  variant?: 'solid' | 'outline' | 'text';
  // Styles
  contentStyle?: RbkStyles;
  labelStyle?: RbkStyles;

  /** @deprecated use startAddon instead */
  startIcon?: ReactElement;
  /** @deprecated use endAddon instead */
  endIcon?: ReactElement;
} & PressableProps &
  FocusableProps &
  BoxProps;

export type ButtonGroupProps = {
  color?: RbkColor;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeValues;
  variant?: 'solid' | 'outline' | 'text';
  // Styles
  contentStyle?: RbkStyles;
} & BoxProps;

export type InputProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  caretHidden?: boolean;
  color?: RbkColor;
  controlled?: boolean;
  defaultValue?: InputValue;
  disabled?: boolean;
  endAddon?: ReactElement;
  error?: string | boolean;
  label?: string;
  mask?: (value: InputValue) => any;
  max?: number;
  maxLength?: number;
  min?: number;
  multiline?: boolean;
  name?: string;
  notNull?: boolean;
  placeholder?: string;
  placeholderColor?: RbkColor;
  readOnly?: boolean;
  returnKeyType?: 'default' | 'done' | 'go' | 'next' | 'search' | 'send';
  rows?: number;
  secure?: boolean;
  selectionColor?: RbkColor;
  size?: SizeValues;
  startAddon?: ReactElement;
  textColor?: RbkColor;
  type?: 'text' | 'number' | 'email' | 'phone' | 'url' | 'hidden' | (string & {});
  unmask?: (value: InputValue) => any;
  value?: InputValue;
  // Events
  onChange?: (event: RbkInputEvent | RbkChangeEvent | RbkEvent, value: InputValue) => any;
  onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
  onSubmit?: (event: RbkInputEvent, value: InputValue) => any;
  // Styles
  contentStyle?: RbkStyles;
  errorStyle?: RbkStyles;
  labelStyle?: RbkStyles;
  inputStyle?: RbkStyles;

  /** @deprecated use startAddon instead */
  startIcon?: ReactElement;
  /** @deprecated use endAddon instead */
  endIcon?: ReactElement;

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
  color?: RbkColor;
  controlled?: boolean;
  defaultValue?: InputValue;
  disabled?: boolean;
  endAddon?: ReactElement;
  error?: string | boolean;
  label?: string;
  loading?: boolean;
  name?: string;
  options?: SelectOption[];
  placeholder?: string;
  readOnly?: boolean;
  size?: SizeValues;
  startAddon?: ReactElement;
  value?: InputValue;
  // Events
  onChange?: (event: RbkInputEvent | RbkChangeEvent | RbkEvent, value: InputValue, option: SelectOption) => any;
  onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
  // Styles
  buttonStyle?: RbkStyles;
  errorStyle?: RbkStyles;
  labelStyle?: RbkStyles;

  /** @deprecated use startAddon instead */
  startIcon?: ReactElement;
  /** @deprecated use endAddon instead */
  endIcon?: ReactElement;
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
  onChange?: (event: RbkCheckboxEvent | RbkChangeEvent | RbkEvent, checked: boolean) => any;
  onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
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
  onSlide?: (event: AnyObject, value: number) => any;
  onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
} & FocusableProps &
  BoxProps;

export type CardProps = BoxProps;

export type CarouselProps = {
  chevron?: 'visible' | 'hidden';
  color?: RbkColor;
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
  chevronStyle?: { color?: RbkColor; size?: number } & RbkStyles;
} & BoxProps;

export type ScrollableProps = {
  contentInset?: number;
  direction?: 'vertical' | 'horizontal';
  hideScrollBar?: boolean;

  /** Note: vertical pagination is not supported on Android. **/
  pagingEnabled?: boolean;

  // Styles
  contentStyle?: RbkStyles;
} & Omit<BoxProps, 'direction'>;

export type ImageProps = {
  source: { uri?: string } | (string & {}) | (number & {});
  alt?: string;
  circular?: boolean;
  fallback?: ReactElement;
  mode?: 'cover' | 'contain' | 'fill';
  width?: number | string;
  height?: number | string;
  // Events
  onLoad?: EventCallback;
  onError?: EventCallback;
} & BoxProps;

export type DividerProps = {
  color?: RbkColor;
  opacity?: number;
  size?: number | string;
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
  visible?: boolean;

  /** @deprecated use visible instead */
  in?: boolean;
} & BoxProps;

export type DropdownProps = {
  visible?: boolean;
} & BoxProps;

export type LoadingProps = {
  color?: RbkColor;
  label?: string;
  size?: SizeValues;
  // Styles
  labelStyle?: RbkStyles;
} & BoxProps;

export type GridProps = {
  gap?: number;
  size?: number;
} & BoxProps;

export type TableProps = {
  columns: {
    header?: ReactElement | AnyCallback | string;
    content?: ReactElement | AnyCallback | string;
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
} & Omit<TextProps, 'size'>;

// TODO: remove event as "any" in next release
export type FormProps = {
  data?: any;
  errors?: { [key: string]: string | boolean } | null;
  onSubmit?: (event: RbkFormEvent | any, data: AnyObject) => any;
  onCancel?: (event: RbkFormEvent | any) => any;
  onClear?: (event: RbkFormEvent | any, data: AnyObject) => any;
  onChange?: (event: RbkFormEvent | any, data: AnyObject) => any;
} & BoxProps;

export type TooltipProps = {
  color?: 'black' | 'white' | RbkColor;
  position?: 'top' | 'bottom' | 'left' | 'right';
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
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  from?: RbkStyles;
  in?: boolean;
  loop?: boolean | number;
  speed?: number;
  timing?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  to?: RbkStyles;

  // Pre-defined animations
  fade?: boolean | 1 | -1;
  zoom?: boolean | 1 | -1;
  spin?: boolean | 1 | -1;
} & Omit<BoxProps, 'direction'>;

export type ProgressProps = {
  color?: RbkColor;
  label?: boolean | ((value: number) => ReactElement);
  size?: SizeValues;
  value?: number;
  // Styles
  barStyle?: RbkStyles;
  labelStyle?: RbkStyles;
} & BoxProps;

export type ListItemProps = {
  chevron?: boolean | ReactElement;
  endAddon?: ReactElement;
  gap?: number;
  startAddon?: ReactElement;
  // Styles
  chevronStyle?: {
    size?: number;
    color?: RbkColor;
  } & RbkStyles;

  /** @deprecated use startAddon instead */
  startIcon?: ReactElement;
  /** @deprecated use endAddon instead */
  endIcon?: ReactElement;
} & BoxProps;

export type LinkProps = {
  underline?: boolean;
} & TextProps;

export type DrawerProps = {
  placement?: 'left' | 'right' | 'top' | 'bottom';

  // Styles
  backdropStyle?: RbkStyles;
} & BoxProps;

export type OutlineProps = {
  color?: RbkColor;
  size?: number;
  visible?: 'auto' | boolean;
} & BoxProps;

export type TabsProps = {
  color?: RbkColor;
  size?: SizeValues;
  tabs: ({
    label: string;
    value?: string | number;
  } & Omit<ButtonProps, 'children'>)[];
  value?: string | number;
  variant?: 'group' | 'card';
  // Events
  onChange?: (event: Function, value: string | number) => any;
  // Styles
  contentStyle?: RbkStyles;
  buttonStyle?: RbkStyles;
  activeStyle?: RbkStyles;
} & Omit<ScrollableProps, 'direction'>;
