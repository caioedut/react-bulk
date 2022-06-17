"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function clone(mixin) {
    let result = Array.isArray(mixin) ? [] : {};
    for (const key in mixin) {
        const item = mixin[key];
        let value = item;
        if (item && typeof item === 'object') {
            value = clone(item);
        }
        result[key] = value;
    }
    return result;
}
exports.default = clone;
