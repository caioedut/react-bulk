"use strict";
// @reference https://www.npmjs.com/package/clsx
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(...args) {
    let i = 0, tmp, x, str = '';
    while (i < args.length) {
        if ((tmp = args[i++])) {
            if ((x = toVal(tmp))) {
                str && (str += ' ');
                str += x;
            }
        }
    }
    return str;
}
exports.default = default_1;
function toVal(mix) {
    let k, y, str = '';
    if (typeof mix === 'string' || typeof mix === 'number') {
        str += mix;
    }
    else if (typeof mix === 'object') {
        if (Array.isArray(mix)) {
            for (k = 0; k < mix.length; k++) {
                if (mix[k]) {
                    if ((y = toVal(mix[k]))) {
                        str && (str += ' ');
                        str += y;
                    }
                }
            }
        }
        else {
            for (k in mix) {
                if (mix[k]) {
                    str && (str += ' ');
                    str += k;
                }
            }
        }
    }
    return str;
}
