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
const Platform_1 = __importDefault(require("./Platform"));
function createImage(_a, ref, map) {
    var { width, height, mode = 'cover', style } = _a, rest = __rest(_a, ["width", "height", "mode", "style"]);
    const { web, native } = Platform_1.default;
    const { Box, Image } = map;
    const defaultRef = (0, react_1.useRef)(null);
    const imageRef = ref || defaultRef;
    style = [
        web && { display: 'block', objectFit: mode },
        native && { resizeMode: mode === 'fill' ? 'stretch' : mode },
        style,
        { width, height },
    ];
    return (0, jsx_runtime_1.jsx)(Box, Object.assign({ component: Image }, rest, { ref: imageRef, style: style }));
}
exports.default = createImage;
