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
function createScrollable(_a, ref, map) {
    var { horizontal, style } = _a, props = __rest(_a, ["horizontal", "style"]);
    const theme = (0, ReactBulk_1.useTheme)();
    const { web, native } = Platform_1.default;
    const { Box, ScrollView } = map;
    const styleX = [
        {
            flex: 1,
        },
        web && horizontal && { overflowX: 'auto' },
        web && !horizontal && { overflowY: 'auto' },
        web && { scrollBehavior: 'smooth' },
        style,
    ];
    if (native) {
        props = Object.assign({ indicatorStyle: theme.mode === 'dark' ? 'white' : 'black', keyboardDismissMode: 'on-drag', keyboardShouldPersistTaps: 'always', nestedScrollEnabled: true, pinchGestureEnabled: false, scrollIndicatorInsets: horizontal ? { bottom: 1, left: 1 } : { top: 1, right: 1 } }, props);
    }
    return (0, jsx_runtime_1.jsx)(Box, Object.assign({ ref: ref, component: ScrollView }, props, { style: styleX }));
}
exports.default = createScrollable;
