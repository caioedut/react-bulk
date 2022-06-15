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
const ReactBulk_1 = require("./ReactBulk");
const getStyle_1 = __importDefault(require("./getStyle"));
const jss_1 = __importDefault(require("./styles/jss"));
function createText(_a, ref, map) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var { label, size, style } = _a, rest = __rest(_a, ["label", "size", "style"]);
    const theme = (0, ReactBulk_1.useTheme)();
    const { web, native } = Platform_1.default;
    const { Box, Text, Input, ios } = map;
    const { disabled } = rest;
    const styleX = (0, jss_1.default)([
        {
            fontSize: theme.rem(1),
            lineHeight: 1.25,
            backgroundColor: theme.colors.background.primary,
            color: theme.colors.text.primary,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.colors.primary.main,
            borderRadius: theme.shape.borderRadius,
            paddingVertical: theme.rem(0.5),
            paddingHorizontal: theme.rem(0.6),
            margin: 0,
            width: '100%',
        },
        size === 'small' && {
            fontSize: theme.rem(0.875),
            paddingVertical: theme.rem(0.5, theme.rem(0.875)),
            paddingHorizontal: theme.rem(0.6, theme.rem(0.875)),
        },
        size === 'large' && {
            fontSize: theme.rem(1.25),
            paddingVertical: theme.rem(0.5, theme.rem(1.25)),
            paddingHorizontal: theme.rem(0.6, theme.rem(1.25)),
        },
        disabled && {
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.background.disabled,
            opacity: 0.75,
        },
        web && disabled && { cursor: 'not-allowed' },
        web && {
            fontFamily: 'inherit',
            transitionProperty: 'box-shadow',
            transitionDuration: '0.2s',
            transitionTimingFunction: 'ease',
            '&:focus': {
                outline: 0,
                boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
            },
        },
        style,
    ]);
    if (native) {
        // Calculate full height (for iOS)
        const pt = (_d = (_c = (_b = (0, getStyle_1.default)(styleX, 'paddingTop')) !== null && _b !== void 0 ? _b : (0, getStyle_1.default)(styleX, 'paddingVertical')) !== null && _c !== void 0 ? _c : (0, getStyle_1.default)(styleX, 'padding')) !== null && _d !== void 0 ? _d : 0;
        const pb = (_g = (_f = (_e = (0, getStyle_1.default)(styleX, 'paddingBottom')) !== null && _e !== void 0 ? _e : (0, getStyle_1.default)(styleX, 'paddingVertical')) !== null && _f !== void 0 ? _f : (0, getStyle_1.default)(styleX, 'padding')) !== null && _g !== void 0 ? _g : 0;
        const bt = (_j = (_h = (0, getStyle_1.default)(styleX, 'borderTopWidth')) !== null && _h !== void 0 ? _h : (0, getStyle_1.default)(styleX, 'borderWidth')) !== null && _j !== void 0 ? _j : 0;
        const bb = (_l = (_k = (0, getStyle_1.default)(styleX, 'borderBottomWidth')) !== null && _k !== void 0 ? _k : (0, getStyle_1.default)(styleX, 'borderWidth')) !== null && _l !== void 0 ? _l : 0;
        const fs = (0, getStyle_1.default)(styleX, 'fontSize');
        const lh = (0, getStyle_1.default)(styleX, 'lineHeight');
        styleX.height = (_m = styleX.height) !== null && _m !== void 0 ? _m : pt + pb + bt + bb + fs * lh;
        if (ios) {
            delete styleX.lineHeight;
        }
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [Boolean(label) && (0, jsx_runtime_1.jsx)(Text, { children: label }), (0, jsx_runtime_1.jsx)(Box, Object.assign({ ref: ref, component: Input }, rest, { style: styleX }))] }));
}
exports.default = createText;
