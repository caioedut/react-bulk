"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTheme_1 = __importDefault(require("../createTheme"));
const light = (0, createTheme_1.default)({
    colors: {
        text: {
            primary: '#333333',
            secondary: '#666666',
            disabled: '#999999',
        },
        background: {
            primary: '#EDEDED',
            secondary: '#CFCFCF',
            disabled: '#616161',
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
exports.default = light;
