"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const Box_1 = __importDefault(require("./src/Box"));
const map = {
    Box: Box_1.default,
    View: react_native_1.View,
    Text: react_native_1.Text,
    Button: react_native_1.TouchableOpacity,
};
exports.default = map;
