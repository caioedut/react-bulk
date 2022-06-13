"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const core_1 = require("@react-bulk/core");
const Box = (0, react_1.forwardRef)((props, ref) => {
    return (0, core_1.createBox)(props, ref, react_native_1.View);
});
exports.default = Box;
