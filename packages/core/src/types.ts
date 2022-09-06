import { CSSProperties, ReactNode, RefObject } from 'react';

export type AnyObject = { [key: string]: string };
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

export type FactoryProps = {
  map: MapType;
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
  disabled?: boolean;
  value?: string;
  onChange?: ChangeCallback;
  readOnly?: boolean;

  /** @deprecated use onChange(e, value) instead */
  onInput?: Function;
  /** @deprecated use onChange(e, value) instead */
  onChangeText?: Function;
};

export type FlexJustifyValues = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
export type FlexAlignValues = 'flex-start' | 'flex-end' | 'center' | 'stretch';
export type ColorValues = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | string;
export type SizeValues = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

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
  defaultProps: AnyObject;
  defaultStyles: {
    root?: JssStyles;
    [key: string]: JssStyles;
  };
};

export type ThemeProps = {
  mode?: ThemeMode;

  shape?: {
    borderRadius?: number;
    spacing?: number;
  };

  typography?: {
    fontSize?: number;
    lineHeight?: number;
  };

  colors?: {
    primary?: ThemeColorsProps;
    secondary?: ThemeColorsProps;
    info?: ThemeColorsProps;
    success?: ThemeColorsProps;
    warning?: ThemeColorsProps;
    error?: ThemeColorsProps;

    common?: {
      trans?: 'rgba(0, 0, 0, 0)' | string;
      black?: '#000000' | string;
      white?: '#ffffff' | string;
      gray?: '#808080' | string;
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

    [key: string]: ThemeColorsProps | any;
  };

  mixins?: {
    transitions?: {
      slow?: AnyObject;
      medium?: AnyObject;
      fast?: AnyObject;
    };

    zIndex: {
      modal: number;
      dropdown: number;
      tooltip: number;
    };
  };

  breakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };

  rem?: Readonly<Function>;
  spacing?: Readonly<Function>;
  color?: Readonly<Function>;
  hex2rgba?: Readonly<Function>;
  rgba2hex?: Readonly<Function>;
  contrast?: Readonly<Function>;

  components?: {
    Backdrop?: ThemeComponentProps;
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
    Tooltip?: ThemeComponentProps;
  };
};

export type BoxProps = {
  component?: any;
  id?: string;
  className?: any;
  platform?: object;
  accessibility?: AccessibilityProps;
  children?: ReactNode;
  invisible?: boolean;
  block?: boolean;
  hidden?: boolean;

  // Styles
  style?: JssStyles;
  rawStyle?: JssStyles;

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
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width';

  numberOfLines?: number;
} & BoxProps;

export type LabelProps = {
  for?: string | RefObject<ReactNode>;
} & TextProps;

export type FormControlBaseProps = {
  color?: ColorValues;
  endIcon?: string | ReactNode;
  label?: string;
  size?: SizeValues;
  startIcon?: string | ReactNode;
  // Styles
  labelStyle?: JssStyles;
};

export type ButtonProps = FormControlBaseProps & {
  badge?: number | BadgeProps;
  disabled?: boolean;
  href?: string;
  icon?: boolean | string | ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit';
  variant?: 'solid' | 'outline' | 'text';
  // Styles
  contentStyle?: JssStyles;
} & FocusableProps;

export type ButtonGroupProps = {
  color?: ColorValues;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeValues;
  variant?: 'solid' | 'outline' | 'text' | string;
  // Styles
  contentStyle?: JssStyles;
} & BoxProps;

export type InputBaseProps = {
  name?: string;
} & EditableProps &
  FormControlBaseProps &
  FocusableProps;

export type InputProps = InputBaseProps & {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  caretHidden?: boolean;
  maxLength?: number;
  multiline?: boolean;
  placeholder?: string;
  returnKeyType?: 'default' | 'done' | 'go' | 'next' | 'search' | 'send';
  secure?: boolean;
  selectionColor?: ColorValues;
  type?: 'text' | 'number' | 'email' | 'phone' | 'url';
  // Styles
  containerStyle?: JssStyles;
  inputStyle?: JssStyles;
};

export type SelectProps = InputBaseProps & {
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
  // Styles
  buttonStyle?: JssStyles;
};

export type CheckboxProps = InputBaseProps & {
  checked?: boolean;
  defaultChecked?: boolean;
  unique?: boolean;
};

export type CardProps = BoxProps;

export type ScrollableProps = {
  direction?: 'vertical' | 'horizontal';
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

export type IconProps = {
  alt?: string;
  color?: ColorValues;
  mirrored?: boolean;
  name: string;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
} & BoxProps;

export type LoadingProps = {
  color?: ColorValues;
  label?: string;
  size?: number;
  speed?: string;
} & BoxProps;

export type GridProps = {
  gap?: number;
  size?: number;
} & BoxProps;

export type TableProps = {
  columns: [
    {
      header?: ReactNode | AnyCallback | string;
      content?: ReactNode | AnyCallback | string;
      style?: JssStyles;
    },
  ];
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
  onSubmit?: SubmitCallback;
} & BoxProps;

export type TooltipProps = {
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: 'black' | 'white' | ColorValues;
} & BoxProps;
