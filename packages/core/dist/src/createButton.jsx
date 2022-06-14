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
const ThemeProvider_1 = require("./ThemeProvider");
const getStyle_1 = __importDefault(require("./getStyle"));
function createButton(_a, ref, map) {
    var { variant, style, children } = _a, rest = __rest(_a, ["variant", "style", "children"]);
    const theme = (0, ThemeProvider_1.useTheme)();
    const { Box, Text, Button } = map;
    const { disabled } = rest;
    const color = theme.colors.secondary.main;
    const styleX = [
        {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: theme.rem(1),
            lineHeight: 1.15,
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
        variant === 'text' && { borderColor: theme.colors.common.trans },
        (variant === 'outline' || variant === 'text') && { backgroundColor: theme.colors.common.trans, color },
        style,
    ];
    const textColor = (0, getStyle_1.default)(styleX, 'color');
    const fontSize = (0, getStyle_1.default)(styleX, 'fontSize');
    if (typeof children === 'string') {
        children = (<Box component={Text} style={{ color: textColor, fontSize }}>
        {children}
      </Box>);
    }
    return (<Box component={Button} {...rest} style={styleX}>
      {children}
    </Box>);
}
exports.default = createButton;
