"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyle = exports.mergeStyles = exports.createStyle = exports.createTheme = exports.createText = exports.createButton = exports.createBox = exports.Platform = exports.useTheme = exports.ThemeProvider = exports.utils = exports.themes = exports.styles = void 0;
const ThemeProvider_1 = __importStar(require("./src/ThemeProvider"));
exports.ThemeProvider = ThemeProvider_1.default;
Object.defineProperty(exports, "useTheme", { enumerable: true, get: function () { return ThemeProvider_1.useTheme; } });
const styles = __importStar(require("./src/styles"));
exports.styles = styles;
const themes = __importStar(require("./src/themes"));
exports.themes = themes;
const utils = __importStar(require("./src/utils"));
exports.utils = utils;
var Platform_1 = require("./src/Platform");
Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return __importDefault(Platform_1).default; } });
var createBox_1 = require("./src/createBox");
Object.defineProperty(exports, "createBox", { enumerable: true, get: function () { return __importDefault(createBox_1).default; } });
var createButton_1 = require("./src/createButton");
Object.defineProperty(exports, "createButton", { enumerable: true, get: function () { return __importDefault(createButton_1).default; } });
var createText_1 = require("./src/createText");
Object.defineProperty(exports, "createText", { enumerable: true, get: function () { return __importDefault(createText_1).default; } });
var createTheme_1 = require("./src/createTheme");
Object.defineProperty(exports, "createTheme", { enumerable: true, get: function () { return __importDefault(createTheme_1).default; } });
var createStyle_1 = require("./src/createStyle");
Object.defineProperty(exports, "createStyle", { enumerable: true, get: function () { return __importDefault(createStyle_1).default; } });
var mergeStyles_1 = require("./src/mergeStyles");
Object.defineProperty(exports, "mergeStyles", { enumerable: true, get: function () { return __importDefault(mergeStyles_1).default; } });
var getStyle_1 = require("./src/getStyle");
Object.defineProperty(exports, "getStyle", { enumerable: true, get: function () { return __importDefault(getStyle_1).default; } });
