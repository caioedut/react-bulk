import {
  Animated,
  Dimensions,
  Easing,
  Platform,
  Image as RNImage,
  Modal as RNModal,
  Text as RNText,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions as useDimensions,
} from 'react-native';

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
  ScrollableFactory,
  SelectFactory,
  SliderFactory,
  TableFactory,
  TabsFactory,
  TerminalFactory,
  TextFactory,
  TooltipFactory,
  global,
  useTheme,
} from '@react-bulk/core';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Mask,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Image as SvgImage,
  Text as SvgText,
  Symbol,
  TSpan,
  TextPath,
  Use,
} from 'react-native-svg';

global.mapping = {
  web: false,
  native: true,
  ios: Platform.OS === 'ios',
  android: Platform.OS === 'android',

  useDimensions,

  dimensions: {
    window() {
      return Dimensions.get('window');
    },
  },

  Button: TouchableOpacity,
  Dialog: RNModal,
  Form: View,
  Image: RNImage,
  Input: TextInput,
  Label: RNText,
  Link: RNText,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text: RNText,
  TextArea: TextInput,
  View,

  // Animated
  Animated,
  Easing,

  // Svg
  svg: {
    Svg,
    Circle,
    Ellipse,
    G,
    Text: SvgText,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image: SvgImage,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
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
export const InputPin = InputPinFactory;
export const Label = LabelFactory;
export const Link = LinkFactory;
export const List = ListFactory;
export const ListItem = ListItemFactory;
export const Loading = LoadingFactory;
export const Modal = ModalFactory;
export const Outline = OutlineFactory;
export const Progress = ProgressFactory;
export const Scrollable = ScrollableFactory;
export const Select = SelectFactory;
export const Slider = SliderFactory;
export const Table = TableFactory;
export const Terminal = TerminalFactory;
export const Tabs = TabsFactory;
export const Text = TextFactory;
export const Tooltip = TooltipFactory;

export { useDimensions, useTheme };

export default ReactBulk;
