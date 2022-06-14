"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Platform_1 = __importDefault(require("./Platform"));
const ThemeProvider_1 = require("./ThemeProvider");
function createText(_a, ref, map) {
    var { size, bold, italic, oblique, smallCaps, invisible, numberOfLines, style } = _a, rest = __rest(_a, ["size", "bold", "italic", "oblique", "smallCaps", "invisible", "numberOfLines", "style"]);
    const theme = (0, ThemeProvider_1.useTheme)();
    const { native } = Platform_1.default;
    const { Box, Text } = map;
    const styleX = [
        {
            color: theme.colors.text.primary,
            fontSize: theme.rem(1),
        },
        size && { fontSize: size },
        bold && { fontWeight: 'bold' },
        italic && { fontStyle: 'italic' },
        oblique && { fontStyle: 'oblique' },
        smallCaps && { fontVariant: 'small-caps' },
        invisible && { opacity: 0 },
        // @ts-ignore
        numberOfLines > 0 && {
            web: {
                display: '-webkit-box',
                '-webkit-line-clamp': `${numberOfLines}`,
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
            },
        },
        style,
    ];
    const props = {};
    if (native && numberOfLines) {
        props.numberOfLines = numberOfLines;
    }
    return (0, jsx_runtime_1.jsx)(Box, Object.assign({ component: Text }, rest, { style: styleX }, props));
}
exports.default = createText;
