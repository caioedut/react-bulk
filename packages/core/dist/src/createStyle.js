"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Platform_1 = __importDefault(require("./Platform"));
const css_1 = __importDefault(require("./styles/css"));
const jss_1 = __importDefault(require("./styles/jss"));
const md5_1 = __importDefault(require("./utils/md5"));
const uuid_1 = __importDefault(require("./utils/uuid"));
function createStyle({ style }) {
    const { web, native } = Platform_1.default;
    const isObject = style && typeof style === 'object';
    const styleX = isObject ? (0, jss_1.default)(style) : style;
    const hash = (0, md5_1.default)(isObject
        ? Object.entries(styleX)
            .map(([attr, val]) => `${attr}${val}`)
            .sort()
            .join('')
        : (0, uuid_1.default)());
    const { current: id } = (0, react_1.useRef)(`css-${hash}`);
    (0, react_1.useEffect)(() => {
        var _a;
        if (!web)
            return;
        const element = (document === null || document === void 0 ? void 0 : document.getElementById(id)) || (document === null || document === void 0 ? void 0 : document.createElement('style')) || {};
        const cssStyle = typeof styleX === 'string' ? styleX : `.${id}{${(0, css_1.default)(styleX)}}`;
        element.id = id;
        element.textContent = cssStyle
            .replace(/[\n\r]|\s{2,}/g, '')
            .replace(/\s?{/g, '{')
            .replace(/}\s?/g, '} ');
        (_a = document === null || document === void 0 ? void 0 : document.head) === null || _a === void 0 ? void 0 : _a.appendChild(element);
    }, [styleX]);
    return native ? styleX : id;
}
exports.default = createStyle;