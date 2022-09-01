import { useEffect, useRef } from 'react';

import Platform from './Platform';
import { useTheme } from './ReactBulk';
import css from './styles/css';
import jss from './styles/jss';
import crypt from './utils/crypt';
import uuid from './utils/uuid';

export type createStyle = {
  name?: string;
  parent?: string;
  style: any;
  global?: boolean;
  insert?: 'after' | 'before';
};

export default function createStyle({ name, style, global, insert }: createStyle) {
  const theme = useTheme();
  const { web, native } = Platform;

  insert = insert || 'after';
  style = typeof style === 'function' ? style(theme) : style;

  const isObject = style && typeof style === 'object';
  const styleX = isObject ? jss({ theme }, style) : style;
  const isEmpty = (isObject ? Object.keys(style) : `${style || ''}`.trim()).length === 0;

  const { current: id } = useRef(name ?? 'rbk-' + crypt(isObject ? JSON.stringify(styleX) : uuid()));

  useEffect(() => {
    if (!web || isEmpty) return;

    const element = document.getElementById(id) || document.createElement('style');
    const cssStyle = (typeof styleX === 'string' ? styleX : css(styleX, global ? '::root' : `.${id}`))
      .replace(/[\n\r]|\s{2,}/g, '')
      .replace(/\s?{/g, '{')
      .replace(/}\s?/g, '} ')
      .trim();

    if (element.textContent !== cssStyle) {
      element.id = id;
      element.textContent = cssStyle;
    }

    if (element.parentElement !== document.head) {
      // if (insert === 'before') {
      //   document.head.prepend(element);
      // } else {
      document.head.append(element);
      // }
    }
  }, [id, styleX]);

  if (isEmpty) {
    return native ? {} : '';
  }

  return native ? styleX : id;
}
