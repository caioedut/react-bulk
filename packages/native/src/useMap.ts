import { Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function useMap() {
  const dimensions = useWindowDimensions();

  return {
    web: false,
    native: true,
    ios: Platform.OS === 'ios',
    android: Platform.OS === 'android',

    dimensions,

    Button: TouchableOpacity,
    Image,
    Input: TextInput,
    Label: Text,
    ScrollView,
    Text,
    View,
  };
}
