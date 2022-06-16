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
function breakpoints(_a, points, dimensions) {
    var props = __rest(_a, []);
    const breakpoints = Object.entries(points).reverse();
    for (const prop in props) {
        const value = props[prop];
        for (const [name, point] of breakpoints) {
            if ((value === null || value === void 0 ? void 0 : value[name]) && dimensions.width >= point) {
                props[prop] = prop === null || prop === void 0 ? void 0 : prop[name];
                break;
            }
        }
        Object.keys(points).forEach((name) => value === null || value === void 0 ? true : delete value[name]);
    }
    return props;
}
exports.default = breakpoints;
