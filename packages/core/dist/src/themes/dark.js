"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTheme_1 = __importDefault(require("../createTheme"));
const dark = (0, createTheme_1.default)({
    colors: {
        text: {
            primary: '#D8D8D8',
            secondary: '#A7A7A7',
            disabled: '#787878',
        },
        background: {
            primary: '#1B1B1B',
            secondary: '#333333',
            disabled: '#000000',
        },
        primary: {
            main: '#673ab7',
            light: '#9a67ea',
            dark: '#320b86',
        },
        secondary: {
            main: '#009688',
            light: '#52c7b8',
            dark: '#00675b',
        },
    },
});
exports.default = dark;
