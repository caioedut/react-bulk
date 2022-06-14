import { Text, TouchableOpacity, View } from 'react-native';

import Box from './src/Box';

const map = {
  native: true,
  Box: Box,
  View,
  Text,
  Button: TouchableOpacity,
};

export default map;
