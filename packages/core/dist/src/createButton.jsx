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
Object.defineProperty(exports, "__esModule", { value: true });
function createButton(_a, ref, map) {
    var { children, style } = _a, rest = __rest(_a, ["children", "style"]);
    const { Box, Text, Button } = map;
    if (typeof children === 'string') {
        children = <Text>{children}</Text>;
    }
    const styleX = [
        {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
        },
        style,
    ];
    return (<Box component={Button} {...rest} style={styleX}>
      {children}
    </Box>);
}
exports.default = createButton;
