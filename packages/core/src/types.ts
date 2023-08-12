import { CSSProperties, ReactNode, RefObject, SyntheticEvent } from 'react';

import { styleProps } from './styles/constants';

/****************************
 * FOR INTERNAL USE (START) *
 ****************************/

/** @internal */
export type Overwrite<T, NewT> = NewT & Omit<T, keyof NewT>;

/** @internal */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** @internal */
export type RequiredSome<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

/** @internal */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P];
};

/** @internal */
export type ColorTypographyToken = 'text' | 'background';

/** @internal */
export type ColorTypographyTone = 'primary' | 'secondary' | 'disabled';

/** @internal */
export type ColorToken = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

/** @internal */
export type ColorTone = 'main' | 'light' | 'lighter' | 'dark' | 'darker';

/** @internal */
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

/** @internal */
export type FlexAlignValues =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  // Aliases
  | 'start'
  | 'end';

/** @internal */
export type StyleProps = {
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

/** @internal */
export type SelectOption = {
  label: string;
  value: InputValue;
  disabled?: boolean;
  [key: string]: any;
};

/** @internal */
export type TableColumn = {
  header?: ReactElement | AnyCallback | string;
  content?: ReactElement | AnyCallback | string;
  style?: RbkStyle;
};

/** @internal */
export type TabItem = Overwrite<
  Omit<ButtonProps, 'children'>,
  {
    label: string;
    value?: string | number;
  }
>;

/****************************
 * FOR INTERNAL USE (END) *
 ****************************/

export type ReactElement = ReactNode | ReactNode[] | JSX.Element | JSX.Element[];

export type AnyObject = { [key: string | number]: any };

export type TimeoutType = ReturnType<typeof setTimeout> | null;

export type AnyCallback = (...args: any[]) => any;

export type InputValue = any;

export interface RbkMap {
  web: boolean;
  native: boolean;
  ios: boolean;
  android: boolean;

  useDimensions: () => {
    width: number;
    height: number;
  };

  Animated: {
    View: ReactElement;
  };

  svg: {
    [key: string]: ReactElement;
  };

  [key: string]: ReactElement | any;
}

export type RbkSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | (number & {});

export type RbkColor =
  | ColorTypographyToken
  | ColorToken
  | `${ColorTypographyToken}.${ColorTypographyTone}`
  | `${ColorToken}.${ColorTone}`
  | `${ColorTypographyToken}.${ColorTypographyTone}.${number}`
  | `${ColorToken}.${ColorTone}.${number}`
  | (string & {});

export interface RbkRect {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  pageOffsetX: number;
  pageOffsetY: number;
}

export interface RbkAnimation {
  boomerang?: boolean;
  delay?: number;
  duration?: number;
  timing?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  iterations?: number | 'infinite';

  /** @deprecated use duration instead */
  speed?: number;
}

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

export interface AccessibilityProps {
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
}

export interface PressableProps {
  pressable?: boolean;
  onPress?: (event: Event) => void;
  onPressIn?: (event: Event) => void;
  onPressOut?: (event: Event) => void;

  /** @deprecated use onPress(event) instead */
  onClick?: (event: Event) => void;
  /** @deprecated use onPressIn(event) instead */
  onMouseDown?: (event: Event) => void;
  /** @deprecated use onPressOut(event) instead */
  onMouseUp?: (event: Event) => void;
}

export interface FocusableProps {
  autoFocus?: boolean;
  blur?: () => void;
  focus?: () => void;
  isFocused?: () => boolean;
  // Events
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
}

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

export type RbkStyle = Overwrite<CSSProperties, StyleProps> | Overwrite<CSSProperties, StyleProps>[] | any | any[];

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
  [context in Contexts | 'root']: RbkStyle;
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
    gap: number;
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
      transparent: string;
      black: string;
      white: string;

      /** Alias for "transparent" */
      trans: string;
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
  color: (color: RbkColor, alpha?: `${number}%` | number | null, luminosity?: `${number}%` | number | null) => string;
  contrast: (color: RbkColor, lightColor?: string | null, darkColor?: string | null) => string;

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

export type BoxProps = Overwrite<
  PressableProps & StyleProps,
  {
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
    style?: RbkStyle;
    rawStyle?: RbkStyle;

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
  }
>;

export type TextProps = Overwrite<
  BoxProps,
  {
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
    transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width';
    numberOfLines?: number;
  }
>;

export type LabelProps = Overwrite<
  TextProps,
  {
    for?: string | RefObject<ReactElement>;
  }
>;

export type ButtonProps = Overwrite<
  FocusableProps & BoxProps,
  {
    badge?: number | BadgeProps;
    circular?: boolean;
    color?: RbkColor;
    contrastColor?: RbkColor;
    disabled?: boolean;
    endAddon?: ReactElement;
    href?: string;
    label?: string;
    loading?: boolean;
    size?: RbkSize;
    startAddon?: ReactElement;
    transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width';
    type?: 'button' | 'submit' | 'cancel' | 'clear';
    variant?: 'solid' | 'outline' | 'text';
    // Styles
    contentStyle?: RbkStyle;
    labelStyle?: RbkStyle;

    /** @deprecated use startAddon instead */
    startIcon?: ReactElement;
    /** @deprecated use endAddon instead */
    endIcon?: ReactElement;
  }
>;

export type ButtonGroupProps = Overwrite<
  BoxProps,
  {
    color?: RbkColor;
    disabled?: boolean;
    loading?: boolean;
    size?: RbkSize;
    variant?: 'solid' | 'outline' | 'text';
    // Styles
    contentStyle?: RbkStyle;
  }
>;

export type InputProps = Overwrite<
  FocusableProps & BoxProps,
  {
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
    selectionColor?: RbkColor;
    size?: RbkSize;
    startAddon?: ReactElement;
    textColor?: RbkColor;
    type?: 'text' | 'number' | 'password' | 'email' | 'phone' | 'url' | 'hidden' | (string & {});
    unmask?: (value: InputValue) => any;
    value?: InputValue;
    // Events
    onFocus?: (event: RbkInputEvent, value: InputValue) => void;
    onBlur?: (event: RbkInputEvent, value: InputValue) => void;
    onSubmit?: (event: RbkInputEvent, value: InputValue) => any;
    onChange?: (event: RbkInputEvent | RbkChangeEvent | RbkEvent, value: InputValue) => any;
    onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
    // Styles
    contentStyle?: RbkStyle;
    errorStyle?: RbkStyle;
    labelStyle?: RbkStyle;
    inputStyle?: RbkStyle;

    /** @deprecated use startAddon instead */
    startIcon?: ReactElement;
    /** @deprecated use endAddon instead */
    endIcon?: ReactElement;
    /** @deprecated use type="password" instead */
    secure?: boolean;
    /** @deprecated use onChange(event, value) instead */
    onInput?: (event: Event) => void;
    /** @deprecated use onChange(event, value) instead */
    onChangeText?: (event: Event) => void;
  }
>;

export type SelectProps = Overwrite<
  FocusableProps & BoxProps,
  {
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
    size?: RbkSize;
    startAddon?: ReactElement;
    value?: InputValue;
    // Events
    onFocus?: (event: RbkInputEvent, value: InputValue, option?: SelectOption) => void;
    onBlur?: (event: RbkInputEvent, value: InputValue, option?: SelectOption) => void;
    onChange?: (event: RbkInputEvent | RbkChangeEvent | RbkEvent, value: InputValue, option?: SelectOption) => any;
    onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
    // Styles
    buttonStyle?: RbkStyle;
    errorStyle?: RbkStyle;
    labelStyle?: RbkStyle;

    /** @deprecated use startAddon instead */
    startIcon?: ReactElement;
    /** @deprecated use endAddon instead */
    endIcon?: ReactElement;
  }
>;

export type CheckboxProps = Overwrite<
  FocusableProps & BoxProps,
  {
    checked?: boolean;
    controlled?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    readOnly?: boolean;
    size?: RbkSize;
    unique?: boolean;
    // Events
    onFocus?: (event: RbkCheckboxEvent, checked: boolean) => void;
    onBlur?: (event: RbkCheckboxEvent, checked: boolean) => void;
    onChange?: (event: RbkCheckboxEvent | RbkChangeEvent | RbkEvent, checked: boolean) => any;
    onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
    // Styles
    buttonStyle?: RbkStyle;
    labelStyle?: RbkStyle;
  }
>;

export type SliderProps = Overwrite<
  FocusableProps & BoxProps,
  {
    defaultValue?: number;
    disabled?: boolean;
    max?: number;
    min?: number;
    name?: string;
    readOnly?: boolean;
    size?: RbkSize;
    value?: number;
    // Events
    onFocus?: (event: AnyObject, value: number) => any;
    onBlur?: (event: AnyObject, value: number) => any;
    onSlide?: (event: AnyObject, value: number) => any;
    onChange?: (event: AnyObject, value: number) => any;
    onFormChange?: (event: RbkFormEvent, data: AnyObject) => any;
  }
>;

export type CardProps = Overwrite<BoxProps, {}>;

export type CarouselProps = Overwrite<
  BoxProps,
  {
    chevron?: 'visible' | 'hidden';
    color?: RbkColor;
    gap?: number | true;
    pagingEnabled?: boolean;
    swipe?: false;
    // Column Count
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    // Styles
    chevronStyle?: { color?: RbkColor; size?: number } & RbkStyle;
  }
>;

export type ScrollableProps = Overwrite<
  BoxProps,
  {
    contentInset?: number;
    direction?: 'vertical' | 'horizontal';
    hideScrollBar?: boolean;

    /** Note: vertical pagination is not supported on Android. **/
    pagingEnabled?: boolean;

    // Styles
    contentStyle?: RbkStyle;
  }
>;

export type ImageProps = Overwrite<
  BoxProps,
  {
    source: { uri?: string } | (string & {}) | (number & {});
    alt?: string;
    circular?: boolean;
    fallback?: ReactElement;
    mode?: 'cover' | 'contain' | 'fill';
    width?: number | string;
    height?: number | string;
    // Events
    onLoad?: (event: Event) => void;
    onError?: (event: Event) => void;
  }
>;

export type DividerProps = Overwrite<
  BoxProps,
  {
    color?: RbkColor;
    opacity?: number;
    size?: number | string;
    vertical?: boolean;
  }
>;

export type BackdropProps = Overwrite<
  BoxProps,
  {
    visible?: boolean;
  }
>;

export type ModalProps = Overwrite<
  BoxProps,
  {
    halign?: 'center' | 'left' | 'right';
    valign?: 'center' | 'top' | 'bottom';
    visible?: boolean;
    onBackdropPress?: (event: Event) => void;
  }
>;

export type CollapseProps = Overwrite<
  BoxProps,
  {
    visible?: boolean;

    /** @deprecated use visible instead */
    in?: boolean;
  }
>;

export type DropdownProps = Overwrite<
  BoxProps,
  {
    visible?: boolean;
  }
>;

export type LoadingProps = Overwrite<
  BoxProps,
  {
    color?: RbkColor;
    label?: string;
    size?: RbkSize;
    // Styles
    labelStyle?: RbkStyle;
  }
>;

export type GridProps = Overwrite<
  BoxProps,
  {
    gap?: number | true;
    size?: number;
  }
>;

export type TableProps = Overwrite<
  BoxProps,
  {
    columns: TableColumn[];
    rows?: any[] | any;
  }
>;

export type BadgeProps = Overwrite<
  TextProps,
  {
    value?: number;
    size?: RbkSize;
    dot?: boolean;
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
    // Styles
    labelStyle?: RbkStyle;
  }
>;

// TODO: remove event as "any" in next major release
export type FormProps = Overwrite<
  BoxProps,
  {
    data?: any;
    errors?: { [key: string]: string | boolean } | null;
    onSubmit?: (event: RbkFormEvent | any, data: AnyObject) => any;
    onCancel?: (event: RbkFormEvent | any) => any;
    onClear?: (event: RbkFormEvent | any, data: AnyObject) => any;
    onChange?: (event: RbkFormEvent | any, data: AnyObject) => any;
  }
>;

export type TooltipProps = Overwrite<
  BoxProps,
  {
    color?: 'black' | 'white' | RbkColor;
    position?: 'top' | 'bottom' | 'left' | 'right';
    title?: string;
    visible?: boolean;
  }
>;

export type ActionSheetProps = Overwrite<
  BoxProps,
  {
    visible?: boolean;
    // Events
    onClose?: (event: Event) => void;
  }
>;

export type AnimationProps = Overwrite<
  BoxProps,
  {
    delay?: number;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    duration?: number;
    from?: RbkStyle;
    in?: boolean;
    loop?: boolean | number;
    timing?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    to?: RbkStyle;

    // Pre-defined animations
    fade?: boolean | 1 | -1;
    zoom?: boolean | 1 | -1;
    spin?: boolean | 1 | -1;

    /** @deprecated use duration instead */
    speed?: number;
  }
>;

export type ProgressProps = Overwrite<
  BoxProps,
  {
    color?: RbkColor;
    label?: boolean | ((value: number) => ReactElement);
    size?: RbkSize;
    value?: number;
    // Styles
    barStyle?: RbkStyle;
    labelStyle?: RbkStyle;
  }
>;

export type ListItemProps = Overwrite<
  BoxProps,
  {
    chevron?: boolean | ReactElement;
    endAddon?: ReactElement;
    gap?: number | true;
    startAddon?: ReactElement;
    // Styles
    chevronStyle?: Overwrite<RbkStyle, { size?: number; color?: RbkColor }>;

    /** @deprecated use startAddon instead */
    startIcon?: ReactElement;
    /** @deprecated use endAddon instead */
    endIcon?: ReactElement;
  }
>;

export type LinkProps = Overwrite<
  TextProps,
  {
    underline?: boolean;
  }
>;

export type DrawerProps = Overwrite<
  BoxProps,
  {
    placement?: 'left' | 'right' | 'top' | 'bottom';

    // Styles
    backdropStyle?: RbkStyle;
  }
>;

export type OutlineProps = Overwrite<
  BoxProps,
  {
    color?: RbkColor;
    size?: number;
    visible?: 'auto' | boolean;
  }
>;

export type TabsProps = Overwrite<
  ScrollableProps,
  {
    color?: RbkColor;
    size?: RbkSize;
    tabs: TabItem[];
    value?: string | number;
    variant?: 'group' | 'card';
    // Events
    onChange?: (event: Event, value: string | number) => any;
    // Styles
    contentStyle?: RbkStyle;
    buttonStyle?: RbkStyle;
    activeStyle?: RbkStyle;
  }
>;

/************************
 * DEPRECATIONS (START) *
 ************************/

/** @deprecated use native Event instead */
export type EventCallback = (event: any) => any;

/** @deprecated use RbkInputEvent instead */
export interface RbkEvent extends RbkInputEvent {}

/** @deprecated use RbkInputEvent instead */
export interface RbkChangeEvent extends RbkInputEvent {}

/** @deprecated use RbkFormEvent instead */
export interface RbkFormChangeEvent extends RbkFormEvent {}

/** @deprecated use RbkSize instead */
export type SizeValues = RbkSize;

/** @deprecated use RbkStyle instead */
export type RbkStyles = RbkStyle;

/************************
 * DEPRECATIONS (END) *
 ************************/
