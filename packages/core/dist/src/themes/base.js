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
            trans: 'transparent',
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
    mixins: {
        shadows: {
            0: 'none',
            1: `0 1px 1px 0 rgba(0, 0, 0, 0.14),
        0 1px 1px -1px rgba(0, 0, 0, 0.20),
        0 1px 2px 0 rgba(0, 0, 0, 0.12)`,
            2: `0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.20),
        0 1px 5px 0 rgba(0, 0, 0, 0.12)`,
            3: `0 3px 4px 0 rgba(0, 0, 0, 0.14),
        0 3px 3px -2px rgba(0, 0, 0, 0.20),
        0 1px 8px 0 rgba(0, 0, 0, 0.12)`,
            4: ` 0 4px 5px 0 rgba(0, 0, 0, 0.14),
         0 1px 10px 0 rgba(0, 0, 0, 0.12),
         0 2px 4px -1px rgba(0, 0, 0, 0.20)`,
            5: `0 6px 10px 0 rgba(0, 0, 0, 0.14),
        0 1px 18px 0 rgba(0, 0, 0, 0.12),
        0 3px 5px -1px rgba(0, 0, 0, 0.20)`,
            6: `0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12),
        0 5px 5px -3px rgba(0, 0, 0, 0.20)`,
            7: `0 16px 24px 2px rgba(0, 0, 0, 0.14),
        0  6px 30px 5px rgba(0, 0, 0, 0.12),
        0  8px 10px -5px rgba(0, 0, 0, 0.20)`,
            8: `0  9px 46px  8px rgba(0, 0, 0, 0.14),
        0 11px 15px -7px rgba(0, 0, 0, 0.12),
        0 24px 38px  3px rgba(0, 0, 0, 0.20)`,
        },
    },
};
exports.default = base;
