"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Box_1 = __importDefault(require("./src/Box"));
const map = {
    ios: false,
    android: false,
    Box: Box_1.default,
    View: 'div',
    ScrollView: 'div',
    Text: 'span',
    Label: 'label',
    Button: 'button',
    Input: 'input',
};
exports.default = map;
