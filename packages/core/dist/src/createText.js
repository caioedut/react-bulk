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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ThemeProvider_1 = require("./ThemeProvider");
function createText(_a, ref, map) {
    var { style } = _a, rest = __rest(_a, ["style"]);
    const theme = (0, ThemeProvider_1.useTheme)();
    const { Box, Text } = map;
    const styleX = [
        {
            color: theme.colors.text.primary,
            fontSize: theme.rem(1),
        },
        style,
    ];
    return (0, jsx_runtime_1.jsx)(Box, Object.assign({ component: Text }, rest, { style: styleX }));
}
exports.default = createText;
