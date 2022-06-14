"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mergeStyles_1 = __importDefault(require("./mergeStyles"));
function getStyle(styles, prop) {
    // @ts-ignore
    return (0, mergeStyles_1.default)(styles)[prop];
}
exports.default = getStyle;
