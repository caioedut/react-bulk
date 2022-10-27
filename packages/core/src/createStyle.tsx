import Platform from './Platform';
import css from './styles/css';
import jss from './styles/jss';
import { JssStyles, ThemeProps } from './types';
import crypt from './utils/crypt';

export type createStyle = {
  style: string | JssStyles;
  theme?: ThemeProps;
  name?: string;
  parent?: string;
  global?: boolean;
  prepend?: boolean;
};

export default function createStyle({ name, style, theme, global: isGlobal, prepend }: createStyle) {
  const { web, native } = Platform;

  theme = (theme || global.theme || {}) as ThemeProps;
  style = typeof style === 'function' ? style(theme) : style;

  const isObject = style && typeof style === 'object';
  const styleX = isObject ? jss({ theme }, style) : style;
  const isEmpty = (isObject ? Object.keys(styleX) : `${styleX || ''}`.trim()).length === 0;

  if (isEmpty) {
    return native ? {} : '';
  }

  const id = name ?? 'rbk-' + crypt(isObject ? JSON.stringify(styleX) : styleX);

  if (web) {
    const element = document.getElementById(id) || document.createElement('style');
    const cssStyle = (typeof styleX === 'string' ? styleX : css(styleX, isGlobal ? '::root' : `.${id}`))
      .replace(/[\n\r]|\s{2,}/g, ' ')
      .replace(/\s?{/g, '{')
      .replace(/}\s?/g, '} ')
      .trim();

    if (element.textContent !== cssStyle) {
      element.id = id;
      element.textContent = cssStyle;
    }

    if (element.parentElement !== document.head) {
      prepend ? document.head.prepend(element) : document.head.append(element);
    }
  }

  return native ? styleX : id;
}
