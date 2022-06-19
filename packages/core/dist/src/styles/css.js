"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("../utils/uuid"));
function css(style, selector) {
    let result = style;
    const isObject = style && typeof style === 'object';
    if (!selector) {
        selector = isObject
            ? Object.entries(style)
                .map(([attr, val]) => `${attr}${val}`)
                .sort()
                .join('')
            : (0, uuid_1.default)();
    }
    if (selector === 'global') {
        selector = null;
    }
    if (isObject) {
        result = '';
        Object.entries(style).forEach(([attr, val]) => {
            if ([undefined, null].includes(val))
                return;
            if (attr.startsWith('&'))
                return;
            let suffix = '';
            if (val && typeof val === 'number' && !notPx.includes(attr)) {
                suffix = 'px';
            }
            if (attr === 'content') {
                val = `'${(val || '').replace(/'/g, "\\'")}'`;
            }
            attr = attr.replace(/[A-Z]/g, (a) => '-' + a.toLowerCase());
            result += `${attr}:${val}${suffix};\n`;
        });
    }
    if (selector) {
        result = `${selector}{${result}}`;
        if (isObject) {
            Object.entries(style).forEach(([attr, val]) => {
                if (attr.startsWith('&')) {
                    attr = attr.substring(1);
                    result += css(val, `${selector}${attr}`);
                }
            });
        }
    }
    return (result || '')
        .replace(/[\n\r]|\s{2,}/g, '')
        .replace(/\s?{/g, '{')
        .replace(/}\s?/g, '} ')
        .trim();
}
exports.default = css;
const notPx = ['lineHeight', 'opacity', 'order'];
