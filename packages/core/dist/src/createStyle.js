"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Platform_1 = __importDefault(require("./Platform"));
const ReactBulk_1 = require("./ReactBulk");
const css_1 = __importDefault(require("./styles/css"));
const jss_1 = __importDefault(require("./styles/jss"));
const crypt_1 = __importDefault(require("./utils/crypt"));
const uuid_1 = __importDefault(require("./utils/uuid"));
function createStyle({ style, className, global }) {
    const theme = (0, ReactBulk_1.useTheme)();
    const { web, native } = Platform_1.default;
    const isObject = style && typeof style === 'object';
    const styleX = isObject ? (0, jss_1.default)({ theme }, style) : style;
    const { current: id } = (0, react_1.useRef)((0, uuid_1.default)());
    const hash = (0, react_1.useMemo)(() => {
        const uid = isObject
            ? Object.entries(styleX)
                .map(([attr, val]) => `${attr}${val}`)
                .sort()
                .join('')
            : id;
        return 'css-' + (0, crypt_1.default)(uid);
    }, [styleX]);
    className = global ? 'global' : className || hash;
    (0, react_1.useEffect)(() => {
        var _a;
        if (!web)
            return;
        const element = (document === null || document === void 0 ? void 0 : document.getElementById(hash)) || (document === null || document === void 0 ? void 0 : document.createElement('style')) || {};
        const cssStyle = typeof styleX === 'string' ? styleX : (0, css_1.default)(styleX, `.${className}`);
        if (element) {
            element.id = hash;
            element.textContent = cssStyle;
        }
        (_a = document === null || document === void 0 ? void 0 : document.head) === null || _a === void 0 ? void 0 : _a.appendChild(element);
    }, [styleX]);
    return native ? styleX : className;
}
exports.default = createStyle;
