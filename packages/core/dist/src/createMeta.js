"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMeta(selector, props, overwrite = true) {
    selector = selector.trim().toLowerCase().startsWith('meta') ? selector : `meta${selector}`;
    let meta = document.querySelector(selector);
    if (!meta || overwrite) {
        meta = meta || document.createElement('meta');
        Object.entries(props).forEach(([attr, val]) => meta.setAttribute(attr, val));
        document.head.appendChild(meta);
    }
    return meta;
}
exports.default = createMeta;
