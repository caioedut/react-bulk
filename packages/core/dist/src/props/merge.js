"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function merge(...mixin) {
    let result = {};
    for (const item of mixin) {
        if (!item)
            continue;
        if (Array.isArray(item)) {
            result = merge(result, ...item);
        }
        else {
            result = Object.assign(Object.assign({}, result), item);
        }
    }
    return result;
}
exports.default = merge;
