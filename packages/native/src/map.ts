import { Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Box from './Box';

const map = {
  ios: Platform.OS === 'ios',
  android: Platform.OS === 'android',

  Box,
  View,
  ScrollView,
  Text,
  Label: Text,
  Button: TouchableOpacity,
  Input: TextInput,
  Image,
};

export default map;
