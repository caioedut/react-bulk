"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Platform = {
    web: typeof document !== 'undefined',
    native: typeof document === 'undefined',
    // typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
};
exports.default = Platform;
