import { Image, Platform, ScrollView, Text, TextInput, TouchableHighlight, View, useWindowDimensions } from 'react-native';

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

    Button: TouchableHighlight,
    Image,
    Input: TextInput,
    Label: Text,
    Link: Text,
    ScrollView,
    Text,
    TextArea: TextInput,
    View,
  };
}
