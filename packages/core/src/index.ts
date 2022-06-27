import ReactBulk, { useTheme } from './ReactBulk';

// Hook
export { useTheme };

// Prop
export { default as get } from './props/get';
export { default as merge } from './props/merge';
export { default as remove } from './props/remove';

// Util
export { default as Platform } from './Platform';
export { default as clone } from './utils/clone';
export { default as clsx } from './utils/clsx';
export { default as crypt } from './utils/crypt';
export { default as sleep } from './utils/sleep';
export { default as uuid } from './utils/uuid';

// Style
export { default as jss } from './styles/jss';
export { default as css } from './styles/css';

// Builder
export { default as createTheme } from './createTheme';
export { default as createStyle } from './createStyle';
export { default as createMeta } from './createMeta';

// Base
export { default as BaseStyleWeb } from './BaseStyleWeb';
export { default as BaseStyleNative } from './BaseStyleNative';

// Type
export * from './types';

// Global Context
export default ReactBulk;
