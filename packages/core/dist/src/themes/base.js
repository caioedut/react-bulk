"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base = {
    shape: {
        borderRadius: 4,
        spacing: 4,
    },
    typography: {
        fontSize: 16,
        iconSize: 24,
    },
    colors: {
        common: {
            trans: 'rgba(0, 0, 0, 0)',
            black: '#000000',
            white: '#ffffff',
        },
        info: {
            main: '#2196f3',
            light: '#6ec6ff',
            dark: '#0069c0',
        },
        success: {
            main: '#4caf50',
            light: '#80e27e',
            dark: '#087f23',
        },
        warning: {
            main: '#ff9800',
            light: '#ffc947',
            dark: '#c66900',
        },
        error: {
            main: '#f44336',
            light: '#ff7961',
            dark: '#ba000d',
        },
    },
    rem(multiplier = 1, base = null) {
        return (base || this.typography.fontSize) * multiplier;
    },
    spacing(multiplier = 1) {
        return this.shape.spacing * multiplier;
    },
    hex2rgba(hex, alpha = 1) {
        var _a;
        const [r, g, b] = ((_a = hex.match(/\w\w/g)) === null || _a === void 0 ? void 0 : _a.map((x) => parseInt(x, 16))) || [];
        return `rgba(${r || 0},${g || 0},${b || 0},${alpha})`;
    },
    mixins: {},
    breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
    },
};
exports.default = base;
