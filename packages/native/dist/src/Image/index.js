"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const core_1 = require("@react-bulk/core");
const map_1 = __importDefault(require("../../map"));
const Image = (0, react_1.forwardRef)((_a, ref) => {
    var { source, width, height, onLayout, style } = _a, props = __rest(_a, ["source", "width", "height", "onLayout", "style"]);
    const { Box } = map_1.default;
    const [imgWidth, setImgWidth] = (0, react_1.useState)(null);
    const [aspectRatio, setAspectRatio] = (0, react_1.useState)(null);
    const [containerWidth, setContainerWidth] = (0, react_1.useState)(null);
    const [finalWidth, setFinalWidth] = (0, react_1.useState)(0);
    const [finalHeight, setFinalHeight] = (0, react_1.useState)(0);
    const loading = [aspectRatio, containerWidth].some((item) => [undefined, null].includes(item));
    if (typeof source === 'string') {
        source = { uri: source };
    }
    (0, react_1.useEffect)(() => {
        if (typeof source === 'number') {
            const image = react_native_1.Image.resolveAssetSource(source);
            setImgWidth(image.width);
            setAspectRatio(image.height / (image.width || 1));
        }
        else {
            // @ts-ignore
            react_native_1.Image.getSize(source.uri, (width, height) => {
                setImgWidth(width);
                setAspectRatio(height / (width || 1));
            });
        }
    }, [source]);
    (0, react_1.useEffect)(() => {
        if (loading)
            return;
        let widthBase = typeof width === 'number' ? width : null;
        let heightBase = typeof height === 'number' ? height : null;
        let newWidth = (widthBase !== null && widthBase !== void 0 ? widthBase : Math.min(imgWidth !== null && imgWidth !== void 0 ? imgWidth : 0, containerWidth !== null && containerWidth !== void 0 ? containerWidth : 0));
        let newHeight = (heightBase !== null && heightBase !== void 0 ? heightBase : 0);
        // Calc height
        if (!heightBase) {
            newHeight = newWidth * (aspectRatio !== null && aspectRatio !== void 0 ? aspectRatio : 0);
        }
        // Calc width
        if (!widthBase) {
            newWidth = newHeight / (aspectRatio !== null && aspectRatio !== void 0 ? aspectRatio : 1);
        }
        setFinalWidth(newWidth);
        setFinalHeight(newHeight);
    }, [loading, width, height, containerWidth, imgWidth, aspectRatio]);
    const handleLayout = (e) => {
        setContainerWidth(e.nativeEvent.layout.width);
        onLayout === null || onLayout === void 0 ? void 0 : onLayout(e);
    };
    const styleX = [style, width && { width }, height && { height }];
    // @ts-ignore
    props = Object.assign(Object.assign({}, props), { width: finalWidth, height: finalHeight, source });
    return ((0, jsx_runtime_1.jsx)(Box, Object.assign({ onLayout: handleLayout, style: styleX }, { children: (0, core_1.createImage)(props, ref, map_1.default) })));
});
exports.default = Image;
