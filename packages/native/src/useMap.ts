import { Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import * as Icons from 'phosphor-react-native';

export default function useMap() {
  const dimensions = useWindowDimensions();

  return {
    web: false,
    native: true,
    ios: Platform.OS === 'ios',
    android: Platform.OS === 'android',

    dimensions,
    Icons,

    Button: TouchableOpacity,
    Image,
    Input: TextInput,
    Label: Text,
    ScrollView,
    Text,
    View,
  };
}
