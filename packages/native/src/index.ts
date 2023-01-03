import {
  Animated,
  Easing,
  Platform,
  Image as RNImage,
  Modal as RNModal,
  Text as RNText,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions as useDimensions,
} from 'react-native';

import {
  ActionSheetFactory,
  AnimationFactory,
  BackdropFactory,
  BadgeFactory,
  BoxFactory,
  ButtonFactory,
  ButtonGroupFactory,
  CardFactory,
  CarouselFactory,
  CheckboxFactory,
  CollapseFactory,
  DividerFactory,
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
  ProgressFactory,
  RbkMap,
  SelectFactory,
  SliderFactory,
  TableFactory,
  TextFactory,
  TooltipFactory,
  global,
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

  Button: TouchableOpacity,
  Dialog: RNModal,
  Form: View,
  Image: RNImage,
  Input: TextInput,
  Label: RNText,
  Link: RNText,
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

export { default as Scrollable } from './Scrollable';

export const ActionSheet = ActionSheetFactory;
export const Animation = AnimationFactory;
export const Backdrop = BackdropFactory;
export const Badge = BadgeFactory;
export const Box = BoxFactory;
export const Button = ButtonFactory;
export const ButtonGroup = ButtonGroupFactory;
export const Card = CardFactory;
export const Carousel = CarouselFactory;
export const Checkbox = CheckboxFactory;
export const Collapse = CollapseFactory;
export const Divider = DividerFactory;
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
export const Progress = ProgressFactory;
export const Select = SelectFactory;
export const Slider = SliderFactory;
export const Table = TableFactory;
export const Text = TextFactory;
export const Tooltip = TooltipFactory;
