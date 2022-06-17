"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStyleNative = exports.BaseStyleWeb = exports.createText = exports.createScrollable = exports.createInput = exports.createCard = exports.createButton = exports.createBox = exports.createMeta = exports.css = exports.jss = exports.uuid = exports.crypt = exports.clsx = exports.clone = exports.Platform = exports.remove = exports.merge = exports.get = exports.createStyle = exports.createTheme = exports.useTheme = void 0;
const ReactBulk_1 = __importStar(require("./src/ReactBulk"));
Object.defineProperty(exports, "useTheme", { enumerable: true, get: function () { return ReactBulk_1.useTheme; } });
var createTheme_1 = require("./src/createTheme");
Object.defineProperty(exports, "createTheme", { enumerable: true, get: function () { return __importDefault(createTheme_1).default; } });
var createStyle_1 = require("./src/createStyle");
Object.defineProperty(exports, "createStyle", { enumerable: true, get: function () { return __importDefault(createStyle_1).default; } });
var get_1 = require("./src/props/get");
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return __importDefault(get_1).default; } });
var merge_1 = require("./src/props/merge");
Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return __importDefault(merge_1).default; } });
var remove_1 = require("./src/props/remove");
Object.defineProperty(exports, "remove", { enumerable: true, get: function () { return __importDefault(remove_1).default; } });
var Platform_1 = require("./src/Platform");
Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return __importDefault(Platform_1).default; } });
var clone_1 = require("./src/utils/clone");
Object.defineProperty(exports, "clone", { enumerable: true, get: function () { return __importDefault(clone_1).default; } });
var clsx_1 = require("./src/utils/clsx");
Object.defineProperty(exports, "clsx", { enumerable: true, get: function () { return __importDefault(clsx_1).default; } });
var crypt_1 = require("./src/utils/crypt");
Object.defineProperty(exports, "crypt", { enumerable: true, get: function () { return __importDefault(crypt_1).default; } });
var uuid_1 = require("./src/utils/uuid");
Object.defineProperty(exports, "uuid", { enumerable: true, get: function () { return __importDefault(uuid_1).default; } });
var jss_1 = require("./src/styles/jss");
Object.defineProperty(exports, "jss", { enumerable: true, get: function () { return __importDefault(jss_1).default; } });
var css_1 = require("./src/styles/css");
Object.defineProperty(exports, "css", { enumerable: true, get: function () { return __importDefault(css_1).default; } });
var createMeta_1 = require("./src/createMeta");
Object.defineProperty(exports, "createMeta", { enumerable: true, get: function () { return __importDefault(createMeta_1).default; } });
var createBox_1 = require("./src/createBox");
Object.defineProperty(exports, "createBox", { enumerable: true, get: function () { return __importDefault(createBox_1).default; } });
var createButton_1 = require("./src/createButton");
Object.defineProperty(exports, "createButton", { enumerable: true, get: function () { return __importDefault(createButton_1).default; } });
var createCard_1 = require("./src/createCard");
Object.defineProperty(exports, "createCard", { enumerable: true, get: function () { return __importDefault(createCard_1).default; } });
var createInput_1 = require("./src/createInput");
Object.defineProperty(exports, "createInput", { enumerable: true, get: function () { return __importDefault(createInput_1).default; } });
var createScrollable_1 = require("./src/createScrollable");
Object.defineProperty(exports, "createScrollable", { enumerable: true, get: function () { return __importDefault(createScrollable_1).default; } });
var createText_1 = require("./src/createText");
Object.defineProperty(exports, "createText", { enumerable: true, get: function () { return __importDefault(createText_1).default; } });
var BaseStyleWeb_1 = require("./src/BaseStyleWeb");
Object.defineProperty(exports, "BaseStyleWeb", { enumerable: true, get: function () { return __importDefault(BaseStyleWeb_1).default; } });
var BaseStyleNative_1 = require("./src/BaseStyleNative");
Object.defineProperty(exports, "BaseStyleNative", { enumerable: true, get: function () { return __importDefault(BaseStyleNative_1).default; } });
exports.default = ReactBulk_1.default;
