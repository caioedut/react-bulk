import Platform from './Platform';
import createTheme from './createTheme';
import css from './styles/css';
import jss from './styles/jss';
import { ThemeProps } from './types';
import crypt from './utils/crypt';
import uuid from './utils/uuid';

export type createStyle = {
  name?: string;
  parent?: string;
  style: any;
  theme?: ThemeProps;
  global?: boolean;
};

export default function createStyle({ name, style, theme, global }: createStyle) {
  const { web, native } = Platform;

  theme = theme || createTheme();
  style = typeof style === 'function' ? style(theme) : style;

  const isObject = style && typeof style === 'object';
  const styleX = isObject ? jss({ theme }, style) : style;
  const isEmpty = (isObject ? Object.keys(styleX) : `${styleX || ''}`.trim()).length === 0;

  const id = name ?? 'rbk-' + crypt(isObject ? JSON.stringify(styleX) : uuid());

  if (isEmpty) {
    return native ? {} : '';
  }

  if (web) {
    const element = document.getElementById(id) || document.createElement('style');
    const cssStyle = (typeof styleX === 'string' ? styleX : css(styleX, global ? '::root' : `.${id}`))
      .replace(/[\n\r]|\s{2,}/g, ' ')
      .replace(/\s?{/g, '{')
      .replace(/}\s?/g, '} ')
      .trim();

    if (element.textContent !== cssStyle) {
      element.id = id;
      element.textContent = cssStyle;
    }

    if (element.parentElement !== document.head) {
      document.head.append(element);
    }
  }

  return native ? styleX : id;
}
