"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function get(prop, ...mixin) {
    var _a, _b;
    let result;
    for (const item of mixin) {
        if (!item)
            continue;
        if (Array.isArray(item)) {
            result = (_a = get(prop, ...item)) !== null && _a !== void 0 ? _a : result;
        }
        result = (_b = item === null || item === void 0 ? void 0 : item[prop]) !== null && _b !== void 0 ? _b : result;
    }
    return result;
}
exports.default = get;
