"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Box_1 = __importDefault(require("./src/Box"));
const map = {
    web: true,
    Box: Box_1.default,
    View: 'div',
    Text: 'span',
    Button: 'button',
};
exports.default = map;
