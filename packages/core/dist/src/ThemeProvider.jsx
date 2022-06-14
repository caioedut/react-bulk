"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
const react_1 = require("react");
const createTheme_1 = __importDefault(require("./createTheme"));
const light_1 = __importDefault(require("./themes/light"));
const defaultTheme = (0, createTheme_1.default)(light_1.default);
const ThemeContext = (0, react_1.createContext)(defaultTheme);
function useTheme() {
    return ((0, react_1.useContext)(ThemeContext) || defaultTheme);
}
exports.useTheme = useTheme;
function ThemeProvider({ theme, children }) {
    const [themeState, setThemeState] = (0, react_1.useState)((0, createTheme_1.default)(theme));
    const setTheme = (theme) => {
        setThemeState((0, createTheme_1.default)(theme));
    };
    (0, react_1.useEffect)(() => {
        setThemeState((0, createTheme_1.default)(theme));
    }, [theme]);
    return (<ThemeContext.Provider //
     value={Object.assign(Object.assign({}, themeState), { setTheme })}>
      {children}
    </ThemeContext.Provider>);
}
exports.default = ThemeProvider;
