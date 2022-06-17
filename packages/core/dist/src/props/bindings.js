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
const Platform_1 = __importDefault(require("../Platform"));
function default_1(_a) {
    var props = __rest(_a, []);
    const { web, native } = Platform_1.default;
    if (web) {
        if (props.onPress) {
            props.onClick = props.onPress;
        }
        if (props.onPressIn) {
            props.onMouseDown = props.onPressIn;
        }
        if (props.onPressOut) {
            props.onMouseUp = props.onPressOut;
        }
        // if (props.onChange) {
        //   props.onChange = (e: any) => props.onChange(e?.target?.value, e);
        // }
        delete props.onPress;
        delete props.onPressIn;
        delete props.onPressOut;
    }
    if (native) {
        if (props.onClick) {
            props.onPress = props.onClick;
        }
        // if (props.onChange) {
        //   props.onChange = (e: any) => props.onChange(e.text, e);
        // }
        delete props.onClick;
    }
    if (props.disabled) {
        delete props.onClick;
        delete props.onPress;
    }
    return props;
}
exports.default = default_1;
