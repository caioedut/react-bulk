"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BaseStyleNative_1 = __importDefault(require("./BaseStyleNative"));
const BaseStyleWeb_1 = __importDefault(require("./BaseStyleWeb"));
const Platform_1 = __importDefault(require("./Platform"));
const createTheme_1 = __importDefault(require("./createTheme"));
const light_1 = __importDefault(require("./themes/light"));
const defaultTheme = (0, createTheme_1.default)(light_1.default);
const Context = (0, react_1.createContext)(defaultTheme);
function useTheme() {
    return ((0, react_1.useContext)(Context) || defaultTheme);
}
exports.useTheme = useTheme;
function ReactBulk({ theme, children }) {
    const { web, native } = Platform_1.default;
    const [themeState, setThemeState] = (0, react_1.useState)((0, createTheme_1.default)(theme));
    const setTheme = (theme) => {
        setThemeState((0, createTheme_1.default)(theme));
    };
    (0, react_1.useEffect)(() => {
        setTheme(theme);
    }, [theme]);
    return ((0, jsx_runtime_1.jsxs)(Context.Provider, Object.assign({ value: Object.assign(Object.assign({}, themeState), { setTheme }) }, { children: [web && (0, jsx_runtime_1.jsx)(BaseStyleWeb_1.default, {}), native && (0, jsx_runtime_1.jsx)(BaseStyleNative_1.default, {}), children] })));
}
exports.default = ReactBulk;
