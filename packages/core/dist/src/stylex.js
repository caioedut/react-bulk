"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spacings = void 0;
const mergeStyles_1 = __importDefault(require("./mergeStyles"));
exports.spacings = ['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'];
function stylex(...styles) {
    const merged = (0, mergeStyles_1.default)(styles);
    for (const attr of Object.keys(merged)) {
        let prop = attr;
        // @ts-ignore
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
            // @ts-ignore
            delete merged[attr];
        }
        // if (attr.toLowerCase().includes('color')) {}
        // if (attr === 'border') {}
        if (attr === 'bg') {
            // @ts-ignore
            delete merged[attr];
            prop = 'backgroundColor';
        }
        // @ts-ignore
        merged[prop] = value;
    }
    return merged;
}
exports.default = stylex;
