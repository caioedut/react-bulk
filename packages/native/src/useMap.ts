import { useMemo } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

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

export default function useMap() {
  const dimensions = useWindowDimensions();

  return useMemo(
    () => ({
      web: false,
      native: true,
      ios: Platform.OS === 'ios',
      android: Platform.OS === 'android',

      dimensions,

      Button: TouchableOpacity,
      Dialog: Modal,
      Form: View,
      Image,
      Input: TextInput,
      Label: Text,
      Link: Text,
      ScrollView,
      Text,
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
    }),
    [dimensions],
  );
}
