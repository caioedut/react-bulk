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
    return deepmerge_1.default.all([base_1.default, reference, options]);
}
exports.default = createTheme;
