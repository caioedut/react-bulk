"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const Box_1 = __importDefault(require("./src/Box"));
const map = {
    ios: react_native_1.Platform.OS === 'ios',
    android: react_native_1.Platform.OS === 'android',
    Box: Box_1.default,
    View: react_native_1.View,
    Text: react_native_1.Text,
    Label: react_native_1.Text,
    Button: react_native_1.TouchableOpacity,
    Input: react_native_1.TextInput,
};
exports.default = map;
