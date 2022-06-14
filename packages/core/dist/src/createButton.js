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
const ThemeProvider_1 = require("./ThemeProvider");
const getStyle_1 = __importDefault(require("./getStyle"));
function createButton(_a, ref, map) {
    var { variant, size, block, loading, style, children } = _a, rest = __rest(_a, ["variant", "size", "block", "loading", "style", "children"]);
    const theme = (0, ThemeProvider_1.useTheme)();
    const { Box, Text, Button } = map;
    const { disabled } = rest;
    const color = theme.colors.primary.main;
    const styleX = [
        {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: theme.rem(1),
            lineHeight: 1.25,
            backgroundColor: color,
            color: theme.colors.common.white,
            cursor: disabled ? 'not-allowed' : 'pointer',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: color,
            borderRadius: theme.shape.borderRadius,
            paddingTop: theme.rem(0.5),
            paddingBottom: theme.rem(0.5),
            paddingLeft: theme.rem(1),
            paddingRight: theme.rem(1),
        },
        map.web && { fontFamily: 'inherit' },
        block && { width: '100%' },
        disabled && { opacity: 0.75 },
        variant === 'text' && { borderColor: theme.colors.common.trans },
        (variant === 'outline' || variant === 'text') && { backgroundColor: theme.colors.common.trans, color },
        size === 'small' && {
            fontSize: theme.rem(0.875),
            paddingTop: theme.rem(0.25),
            paddingBottom: theme.rem(0.25),
            paddingLeft: theme.rem(0.5),
            paddingRight: theme.rem(0.5),
        },
        size === 'large' && {
            fontSize: theme.rem(1.25),
            paddingTop: theme.rem(0.75),
            paddingBottom: theme.rem(0.75),
            paddingLeft: theme.rem(1.25),
            paddingRight: theme.rem(1.25),
        },
        style,
    ];
    const textStyleX = {
        color: (0, getStyle_1.default)(styleX, 'color'),
        fontSize: (0, getStyle_1.default)(styleX, 'fontSize'),
    };
    if (typeof children === 'string') {
        children = ((0, jsx_runtime_1.jsx)(Box, Object.assign({ component: Text, style: [textStyleX, disabled && { opacity: 0.75 }, loading && { opacity: 0 }] }, { children: children })));
    }
    return ((0, jsx_runtime_1.jsxs)(Box, Object.assign({ component: Button }, rest, { style: styleX }, { children: [children, loading && ((0, jsx_runtime_1.jsx)(Box, Object.assign({ style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bg: theme.hex2rgba(theme.colors.background.primary, 0.1),
                } }, { children: (0, jsx_runtime_1.jsx)(Text, Object.assign({ style: textStyleX }, { children: "..." })) })))] })));
}
exports.default = createButton;
