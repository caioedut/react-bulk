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
const react_1 = require("react");
const core_1 = require("@react-bulk/core");
const map_1 = __importDefault(require("../../map"));
const Image = (0, react_1.forwardRef)((_a, ref) => {
    var { source } = _a, props = __rest(_a, ["source"]);
    // @ts-ignore
    props.src = (0, react_1.useMemo)(() => { var _a; return (_a = source === null || source === void 0 ? void 0 : source.uri) !== null && _a !== void 0 ? _a : source; }, [source]);
    return (0, core_1.createImage)(props, ref, map_1.default);
});
exports.default = Image;
