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
const getStyle_1 = __importDefault(require("./getStyle"));
function createButton(_a, ref, map) {
    var { variant, size, block, loading, style, children } = _a, rest = __rest(_a, ["variant", "size", "block", "loading", "style", "children"]);
    const theme = (0, ThemeProvider_1.useTheme)();
    const { web } = Platform_1.default;
    const { Box, Text, Button } = map;
    const { disabled } = rest;
    const styleX = [
        {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: theme.rem(1),
            lineHeight: 1.25,
            backgroundColor: theme.colors.primary.main,
            color: theme.colors.common.white,
            cursor: 'pointer',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.colors.primary.main,
            borderRadius: theme.shape.borderRadius,
            paddingTop: theme.rem(0.5),
            paddingBottom: theme.rem(0.5),
            paddingLeft: theme.rem(1),
            paddingRight: theme.rem(1),
            margin: 0,
        },
        web && { fontFamily: 'inherit' },
        block && { width: '100%' },
        disabled && {
            cursor: 'not-allowed',
            opacity: 0.75,
        },
        variant === 'text' && { borderColor: theme.colors.common.trans },
        (variant === 'outline' || variant === 'text') && {
            backgroundColor: theme.colors.common.trans,
            color: theme.colors.primary.main,
        },
        size === 'small' && {
            fontSize: theme.rem(0.875),
            paddingTop: theme.rem(0.5, theme.rem(0.875)),
            paddingBottom: theme.rem(0.5, theme.rem(0.875)),
            paddingLeft: theme.rem(0.75, theme.rem(0.875)),
            paddingRight: theme.rem(0.75, theme.rem(0.875)),
        },
        size === 'large' && {
            fontSize: theme.rem(1.25),
            paddingTop: theme.rem(0.5, theme.rem(1.25)),
            paddingBottom: theme.rem(0.5, theme.rem(1.25)),
            paddingLeft: theme.rem(0.75, theme.rem(1.25)),
            paddingRight: theme.rem(0.75, theme.rem(1.25)),
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
