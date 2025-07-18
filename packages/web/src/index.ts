import {
  AvatarFactory,
  BackdropFactory,
  BadgeFactory,
  BoxFactory,
  ButtonFactory,
  ButtonGroupFactory,
  CalendarFactory,
  CardFactory,
  CarouselFactory,
  CheckboxFactory,
  CollapseFactory,
  DividerFactory,
  DrawerFactory,
  DropdownFactory,
  FormFactory,
  GridFactory,
  GrowBoxFactory,
  ImageFactory,
  InputDateFactory,
  InputFactory,
  InputPinFactory,
  LabelFactory,
  LinkFactory,
  ListFactory,
  ListItemFactory,
  LoadingFactory,
  ModalFactory,
  OutlineFactory,
  ProgressFactory,
  RbkMap,
  ReactBulk,
  ResizableFactory,
  ScrollableFactory,
  SelectFactory,
  SplitterFactory,
  SwitchFactory,
  TableFactory,
  TabsFactory,
  TerminalFactory,
  TextFactory,
  TooltipFactory,
  rbkGlobal,
  useTheme,
} from '@react-bulk/core';

import useDimensions from './useDimensions';

const locale = typeof navigator !== 'undefined' ? (navigator.languages?.[0] ?? navigator.language) : null;

rbkGlobal.mapping = {
  web: true,
  native: false,
  ios: false,
  android: false,

  hasLocale: Boolean(locale),
  locale: locale || 'en-US',

  useDimensions,

  dimensions: {
    window() {
      let width = 0;
      let height = 0;

      if (typeof window !== 'undefined') {
        width = window.innerWidth;
        height = window.innerHeight;
      }

      return { width, height };
    },
  },

  Button: 'button',
  Dialog: 'div',
  Form: 'form',
  Image: 'img',
  Input: 'input',
  Label: 'label',
  Link: 'a',
  SafeAreaView: 'div',
  ScrollView: 'div',
  Text: 'span',
  TextArea: 'textarea',
  View: 'div',

  // Svg
  svg: {
    Svg: 'svg',
    Circle: 'circle',
    Ellipse: 'ellipse',
    G: 'g',
    Text: 'text',
    TSpan: 'tspan',
    TextPath: 'textPath',
    Path: 'path',
    Polygon: 'polygon',
    Polyline: 'polyline',
    Line: 'line',
    Rect: 'rect',
    Use: 'use',
    Image: 'image',
    Symbol: 'symbol',
    Defs: 'defs',
    LinearGradient: 'linearGradient',
    RadialGradient: 'radialGradient',
    Stop: 'stop',
    ClipPath: 'clipPath',
    Pattern: 'pattern',
    Mask: 'mask',
  },
} as RbkMap;

export { ReactBulk, useDimensions, useTheme };

export const Avatar = AvatarFactory;
export const Backdrop = BackdropFactory;
export const Badge = BadgeFactory;
export const Box = BoxFactory;
export const Button = ButtonFactory;
export const ButtonGroup = ButtonGroupFactory;
export const Calendar = CalendarFactory;
export const Card = CardFactory;
export const Carousel = CarouselFactory;
export const Checkbox = CheckboxFactory;
export const Collapse = CollapseFactory;
export const Divider = DividerFactory;
export const Drawer = DrawerFactory;
export const Dropdown = DropdownFactory;
export const Form = FormFactory;
export const Grid = GridFactory;
export const GrowBox = GrowBoxFactory;
export const Image = ImageFactory;
export const Input = InputFactory;
export const InputDate = InputDateFactory;
export const InputPin = InputPinFactory;
export const Label = LabelFactory;
export const Link = LinkFactory;
export const List = ListFactory;
export const ListItem = ListItemFactory;
export const Loading = LoadingFactory;
export const Modal = ModalFactory;
export const Outline = OutlineFactory;
export const Progress = ProgressFactory;
export const Resizable = ResizableFactory;
export const Scrollable = ScrollableFactory;
export const Select = SelectFactory;
export const Splitter = SplitterFactory;
export const Switch = SwitchFactory;
export const Table = TableFactory;
export const Tabs = TabsFactory;
export const Terminal = TerminalFactory;
export const Text = TextFactory;
export const Tooltip = TooltipFactory;

/**
 * @deprecated use import { ReactBulk } instead
 */
export default ReactBulk;
