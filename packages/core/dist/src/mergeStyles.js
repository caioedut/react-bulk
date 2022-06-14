"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mergeStyles(...styles) {
    let result = {};
    for (const style of styles) {
        if (style) {
            if (Array.isArray(style)) {
                result = mergeStyles(result, ...style);
            }
            else {
                result = Object.assign(Object.assign({}, result), style);
            }
        }
    }
    return result;
}
exports.default = mergeStyles;
