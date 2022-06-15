"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const core_1 = require("@react-bulk/core");
const map_1 = __importDefault(require("../../map"));
const Card = (0, react_1.forwardRef)((props, ref) => {
    return (0, core_1.createCard)(props, ref, map_1.default);
});
exports.default = Card;
