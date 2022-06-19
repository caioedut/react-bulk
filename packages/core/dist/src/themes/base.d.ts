declare const base: {
    shape: {
        borderRadius: number;
        spacing: number;
    };
    typography: {
        fontSize: number;
        iconSize: number;
    };
    colors: {
        common: {
            trans: string;
            black: string;
            white: string;
        };
        info: {
            main: string;
            light: string;
            dark: string;
        };
        success: {
            main: string;
            light: string;
            dark: string;
        };
        warning: {
            main: string;
            light: string;
            dark: string;
        };
        error: {
            main: string;
            light: string;
            dark: string;
        };
    };
    rem(multiplier?: number, base?: null): number;
    spacing(multiplier?: number): number;
    hex2rgba(hex: string, alpha?: number): string;
    mixins: {};
    breakpoints: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
};
export default base;
