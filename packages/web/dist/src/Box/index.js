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
const react_1 = require("react");
const core_1 = require("@react-bulk/core");
const Box = (0, react_1.forwardRef)((_a, ref) => {
    var props = __rest(_a, []);
    const [dimensions, setDimensions] = (0, react_1.useState)({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    (0, react_1.useEffect)(() => {
        const handleResize = () => setDimensions({ height: window.innerHeight, width: window.innerWidth });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (0, core_1.createBox)(props, ref, { web: true, Text: 'span', dimensions }, 'div');
});
exports.default = Box;
