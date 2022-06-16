"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const core_1 = require("@react-bulk/core");
const Box = (0, react_1.forwardRef)((props, ref) => {
    const [dimensions, setDimensions] = (0, react_1.useState)({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    (0, react_1.useEffect)(() => {
        const handleResize = () => setDimensions({ height: window.innerHeight, width: window.innerWidth });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (0, core_1.createBox)(props, ref, { web: true, dimensions }, 'div');
});
exports.default = Box;
