"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
const react_1 = require("react");
const createTheme_1 = __importDefault(require("./createTheme"));
const light_1 = __importDefault(require("./themes/light"));
const ThemeContext = (0, react_1.createContext)(light_1.default);
function useTheme() {
    return (0, react_1.useContext)(ThemeContext) || light_1.default;
}
exports.useTheme = useTheme;
function ThemeProvider({ theme, children }) {
    const [themeState, setThemeState] = (0, react_1.useState)((0, createTheme_1.default)(theme));
    const setTheme = (0, react_1.useCallback)((theme) => {
        setThemeState((0, createTheme_1.default)(theme));
    }, [theme]);
    (0, react_1.useEffect)(() => {
        setTheme(theme);
    }, [theme, setTheme]);
    return (<ThemeContext.Provider //
     value={Object.assign(Object.assign({}, themeState), { setTheme })}>
      {children}
    </ThemeContext.Provider>);
}
exports.default = ThemeProvider;
