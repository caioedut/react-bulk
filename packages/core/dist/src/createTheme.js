"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge_1 = __importDefault(require("deepmerge"));
const base_1 = __importDefault(require("./themes/base"));
const dark_1 = __importDefault(require("./themes/dark"));
const light_1 = __importDefault(require("./themes/light"));
function createTheme(options = {}) {
    const reference = options.mode === 'dark' ? dark_1.default : light_1.default;
    const theme = deepmerge_1.default.all([{ mode: 'light' }, base_1.default, reference, options]);
    theme.style = (...styles) => {
        // // Send "theme" to functions
        // for (let index in styles) {
        //   if (typeof styles[index] === 'function') {
        //     styles[index] = styles[index](theme);
        //   }
        // }
        //
        // for (const attr in styles) {
        //   if (['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'].includes(attr)) {
        //     styles[attr] *= 4;
        //   }
        //
        //   if (attr.toLowerCase().includes('color')) {
        //     const colors = Object.keys(theme.colors);
        //     const [color, variation = 'main'] = styles[attr].split('.');
        //
        //     if (colors.includes(color)) {
        //       styles[attr] =
        //         theme.colors[color]?.[variation] || theme.colors[color]?.primary || theme.colors[color]?.normal || theme.colors[color] || value;
        //     }
        //   }
        // }
        //
        // return jss(styles);
    };
    return theme;
}
exports.default = createTheme;
