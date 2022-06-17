"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customStyleProps = exports.spacings = void 0;
const Platform_1 = __importDefault(require("../Platform"));
const get_1 = __importDefault(require("../props/get"));
const merge_1 = __importDefault(require("../props/merge"));
const remove_1 = __importDefault(require("../props/remove"));
const clone_1 = __importDefault(require("../utils/clone"));
exports.spacings = ['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'];
exports.customStyleProps = ['w', 'h', 'bg', 'border', 'shadow', ...exports.spacings];
function jss(...mixin) {
    var _a, _b;
    const { web, native } = Platform_1.default;
    const args = (0, clone_1.default)(mixin);
    const theme = (0, get_1.default)('theme', args);
    const webStyle = (0, get_1.default)('web', args);
    const nativeStyle = (0, get_1.default)('native', args);
    (0, remove_1.default)(['theme', 'web', 'native'], args);
    if (theme === null || theme === void 0 ? void 0 : theme.breakpoints) {
        (0, remove_1.default)(Object.keys(theme.breakpoints), args);
    }
    const styles = (0, merge_1.default)(args);
    // Web specific
    if (webStyle && Platform_1.default.web) {
        Object.assign(styles, webStyle);
    }
    // Native specific
    if (nativeStyle && Platform_1.default.native) {
        Object.assign(styles, nativeStyle);
    }
    for (const attr of Object.keys(styles)) {
        let prop = attr;
        let value = styles[attr];
        delete styles[attr];
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
            // Theme multiplier
            if ((theme === null || theme === void 0 ? void 0 : theme.spacing) && typeof value === 'number') {
                value = theme.spacing(value);
            }
        }
        if (attr === 'h') {
            prop = 'height';
        }
        if (attr === 'w') {
            prop = 'width';
        }
        if (attr === 'bg') {
            prop = 'backgroundColor';
        }
        if (attr === 'border') {
            prop = null;
            if (value) {
                const types = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'];
                const split = `${value}`.split(/\s/g).filter((item) => item.trim());
                const sizeIndex = split.findIndex((item) => /^\d\w*$/.test(item));
                // @ts-ignore
                const borderWidth = sizeIndex >= 0 ? +split.splice(sizeIndex, 1).shift().replace(/\D/g, '') : 1;
                const styleIndex = split.findIndex((item) => types.includes(item));
                const borderStyle = styleIndex >= 0 ? split.splice(styleIndex, 1).shift() : 'solid';
                const borderColor = split.shift() || '#000000';
                Object.assign(styles, { borderWidth, borderStyle, borderColor });
            }
        }
        if (web) {
            if (attr === 'paddingVertical') {
                prop = null;
                styles.paddingTop = value;
                styles.paddingBottom = value;
            }
            if (attr === 'paddingHorizontal') {
                prop = null;
                styles.paddingLeft = value;
                styles.paddingRight = value;
            }
        }
        if (native) {
            if (attr === 'shadow' || attr === 'boxShadow') {
                prop = null;
                const colorIndex = value.search(/(\w+\(|#).+/g);
                let color = 'rgba(0, 0, 0, 0)';
                if (colorIndex >= 0) {
                    color = value.substring(colorIndex);
                    value = value.substring(0, colorIndex);
                }
                const split = value.split(' ').filter((item) => item.trim() && !item.includes('inset'));
                const [width, height, shadowRadius] = split.map((item) => Number(item.replace(/\D/g, '') || 0));
                let elevation;
                if (height >= 12 && shadowRadius >= 16) {
                    elevation = 24;
                }
                else if (height >= 11 && shadowRadius >= 15.19) {
                    elevation = 23;
                }
                else if (height >= 11 && shadowRadius >= 14.78) {
                    elevation = 22;
                }
                else if (height >= 10 && shadowRadius >= 13.97) {
                    elevation = 21;
                }
                else if (height >= 10 && shadowRadius >= 13.16) {
                    elevation = 20;
                }
                else if (height >= 9 && shadowRadius >= 12.35) {
                    elevation = 19;
                }
                else if (height >= 9 && shadowRadius >= 11.95) {
                    elevation = 18;
                }
                else if (height >= 8 && shadowRadius >= 11.14) {
                    elevation = 17;
                }
                else if (height >= 8 && shadowRadius >= 10.32) {
                    elevation = 16;
                }
                else if (height >= 7 && shadowRadius >= 9.51) {
                    elevation = 18;
                }
                else if (height >= 7 && shadowRadius >= 9.11) {
                    elevation = 14;
                }
                else if (height >= 6 && shadowRadius >= 8.3) {
                    elevation = 13;
                }
                else if (height >= 6 && shadowRadius >= 7.49) {
                    elevation = 12;
                }
                else if (height >= 5 && shadowRadius >= 6.68) {
                    elevation = 11;
                }
                else if (height >= 5 && shadowRadius >= 6.27) {
                    elevation = 10;
                }
                else if (height >= 4 && shadowRadius >= 5.46) {
                    elevation = 9;
                }
                else if (height >= 4 && shadowRadius >= 4.65) {
                    elevation = 8;
                }
                else if (height >= 3 && shadowRadius >= 4.65) {
                    elevation = 7;
                }
                else if (height >= 3 && shadowRadius >= 4.25) {
                    elevation = 6;
                }
                else if (height >= 2 && shadowRadius >= 3.84) {
                    elevation = 5;
                }
                else if (height >= 2 && shadowRadius >= 2.62) {
                    elevation = 4;
                }
                else if (height >= 1 && shadowRadius >= 2.22) {
                    elevation = 3;
                }
                else if (height >= 1 && shadowRadius >= 1.41) {
                    elevation = 2;
                }
                else {
                    elevation = 1;
                }
                Object.assign(styles, {
                    shadowColor: color,
                    shadowOpacity: 0.18,
                    shadowRadius,
                    shadowOffset: { height, width },
                });
            }
        }
        if ((theme === null || theme === void 0 ? void 0 : theme.colors) && (prop || attr).toLowerCase().includes('color')) {
            const colors = Object.keys(theme.colors);
            const [color, variation = 'main'] = `${value || ''}`.split('.');
            if (colors.includes(color)) {
                value = ((_a = theme.colors[color]) === null || _a === void 0 ? void 0 : _a[variation]) || ((_b = theme.colors[color]) === null || _b === void 0 ? void 0 : _b.primary) || theme.colors[color] || value;
            }
        }
        if (prop) {
            styles[prop] = value;
        }
    }
    const hasFlex = Object.keys(styles).some((prop) => ['flexDirection', 'flexWrap', 'flexFlow', 'justifyContent', 'justifyItems', 'alignContent', 'alignItems'].includes(prop));
    if (hasFlex && !styles.display) {
        styles.display = 'flex';
    }
    return styles;
}
exports.default = jss;
