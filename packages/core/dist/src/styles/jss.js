"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spacings = void 0;
const Platform_1 = __importDefault(require("../Platform"));
const mergeStyles_1 = __importDefault(require("../mergeStyles"));
exports.spacings = ['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'];
function jss(...styles) {
    const merged = (0, mergeStyles_1.default)(styles);
    // Web specific
    if (merged.web && Platform_1.default.web) {
        Object.assign(merged, merged.web);
    }
    // Native specific
    if (merged.native && Platform_1.default.native) {
        Object.assign(merged, merged.native);
    }
    for (const attr of Object.keys(merged)) {
        let prop = attr;
        let value = merged[attr];
        if (exports.spacings.includes(attr)) {
            prop = attr
                .replace(/^(.)t$/, '$1Top')
                .replace(/^(.)b$/, '$1Bottom')
                .replace(/^(.)l$/, '$1Left')
                .replace(/^(.)r$/, '$1Right')
                .replace(/^(.)x$/, '$1Horizontal')
                .replace(/^(.)y$/, '$1Vertical')
                .replace(/^m/, 'margin')
                .replace(/^p/, 'padding')
                .replace(/^t$/, 'top')
                .replace(/^b$/, 'bottom')
                .replace(/^l$/, 'left')
                .replace(/^r$/, 'right');
            delete merged[attr];
        }
        // if (attr.toLowerCase().includes('color')) {}
        // if (attr === 'border') {}
        if (attr === 'bg') {
            delete merged[attr];
            prop = 'backgroundColor';
        }
        // @ts-ignore
        merged[prop] = value;
    }
    const hasFlex = Object.keys(merged).some((prop) => ['flexDirection', 'flexWrap', 'flexFlow', 'justifyContent', 'alignContent', 'alignItems'].includes(prop));
    if (hasFlex && !merged.display) {
        merged.display = 'flex';
    }
    return merged;
}
exports.default = jss;
