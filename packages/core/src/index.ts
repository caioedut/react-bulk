import ReactBulk, { useTheme } from './ReactBulk';

export { useTheme };
export { default as createTheme } from './createTheme';
export { default as createStyle } from './createStyle';

export { default as get } from './props/get';
export { default as merge } from './props/merge';
export { default as remove } from './props/remove';

export { default as Platform } from './Platform';
export { default as clone } from './utils/clone';
export { default as clsx } from './utils/clsx';
export { default as crypt } from './utils/crypt';
export { default as uuid } from './utils/uuid';

export { default as jss } from './styles/jss';
export { default as css } from './styles/css';

export { default as createMeta } from './createMeta';

export { default as createBox } from './createBox';
export { default as createButton } from './createButton';
export { default as createCard } from './createCard';
export { default as createDivider } from './createDivider';
export { default as createInput } from './createInput';
export { default as createImage } from './createImage';
export { default as createScrollable } from './createScrollable';
export { default as createText } from './createText';

export { default as BaseStyleWeb } from './BaseStyleWeb';
export { default as BaseStyleNative } from './BaseStyleNative';

/**
 * Types
 */
export * from './types';

export default ReactBulk;
