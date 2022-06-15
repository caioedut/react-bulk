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
const createStyle_1 = __importDefault(require("./createStyle"));
const bindings_1 = __importDefault(require("./props/bindings"));
const jss_1 = __importDefault(require("./styles/jss"));
function createBox(_a, ref, map, defaultComponent) {
    var { component, style } = _a, rest = __rest(_a, ["component", "style"]);
    if (defaultComponent === void 0) { defaultComponent = null; }
    const styleProp = {};
    const styleX = (0, createStyle_1.default)({ style: (0, jss_1.default)(style) });
    if (styleX) {
        if (typeof styleX === 'string') {
            styleProp.className = `${styleX || ''} ${rest.className || ''}`.trim();
        }
        if (typeof styleX === 'object') {
            styleProp.style = styleX;
        }
    }
    const props = (0, bindings_1.default)(rest);
    const Component = component || defaultComponent;
    return (0, jsx_runtime_1.jsx)(Component, Object.assign({}, props, { ref: ref }, styleProp));
}
exports.default = createBox;
