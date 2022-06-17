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
const react_1 = require("react");
const react_native_1 = require("react-native");
const core_1 = require("@react-bulk/core");
const map_1 = __importDefault(require("../../map"));
const Scrollable = (0, react_1.forwardRef)((_a, ref) => {
    var { refreshing, onRefresh, refreshControl } = _a, props = __rest(_a, ["refreshing", "onRefresh", "refreshControl"]);
    const theme = (0, core_1.useTheme)();
    if (!refreshControl && (onRefresh || refreshing)) {
        refreshControl = (0, jsx_runtime_1.jsx)(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: onRefresh });
    }
    if (refreshControl) {
        // @ts-ignore
        props.refreshControl = refreshControl;
    }
    props = Object.assign({ contentInsetAdjustmentBehavior: 'scrollableAxes', indicatorStyle: theme.mode === 'dark' ? 'white' : 'black', keyboardDismissMode: 'on-drag', keyboardShouldPersistTaps: 'always', nestedScrollEnabled: true, pinchGestureEnabled: false, scrollIndicatorInsets: props.horizontal ? { bottom: 1, left: 1 } : { top: 1, right: 1 } }, props);
    return (0, core_1.createScrollable)(props, ref, map_1.default);
});
exports.default = Scrollable;
