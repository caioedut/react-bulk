import ReactBulk, {
  ActionSheetFactory,
  AnimationFactory,
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
  DatePickerFactory,
  DividerFactory,
  DrawerFactory,
  DropdownFactory,
  FormFactory,
  GridFactory,
  ImageFactory,
  InputFactory,
  LabelFactory,
  LinkFactory,
  ListItemFactory,
  LoadingFactory,
  ModalFactory,
  OutlineFactory,
  ProgressFactory,
  RbkMap,
  ScrollableFactory,
  SelectFactory,
  SliderFactory,
  TableFactory,
  TabsFactory,
  TextFactory,
  TooltipFactory,
  global,
  useTheme,
} from '@react-bulk/core';

import useDimensions from './useDimensions';

global.mapping = {
  web: true,
  native: false,
  ios: false,
  android: false,

  useDimensions,

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

  Animated: {
    View: 'div',
  },

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

export const ActionSheet = ActionSheetFactory;
export const Avatar = AvatarFactory;
export const Animation = AnimationFactory;
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
export const DatePicker = DatePickerFactory;
export const Divider = DividerFactory;
export const Drawer = DrawerFactory;
export const Dropdown = DropdownFactory;
export const Form = FormFactory;
export const Grid = GridFactory;
export const Image = ImageFactory;
export const Input = InputFactory;
export const Label = LabelFactory;
export const Link = LinkFactory;
export const ListItem = ListItemFactory;
export const Loading = LoadingFactory;
export const Modal = ModalFactory;
export const Outline = OutlineFactory;
export const Progress = ProgressFactory;
export const Scrollable = ScrollableFactory;
export const Select = SelectFactory;
export const Slider = SliderFactory;
export const Table = TableFactory;
export const Tabs = TabsFactory;
export const Text = TextFactory;
export const Tooltip = TooltipFactory;

export { useDimensions, useTheme };

export default ReactBulk;
