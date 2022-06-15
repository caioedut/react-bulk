import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Box from './src/Box';

const map = {
  ios: Platform.OS === 'ios',
  android: Platform.OS === 'android',
  Box,
  View,
  Text,
  Label: Text,
  Button: TouchableOpacity,
  Input: TextInput,
};

export default map;
