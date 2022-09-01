import { useEffect, useRef } from 'react';

import Platform from './Platform';
import { useTheme } from './ReactBulk';
import css from './styles/css';
import jss from './styles/jss';
import crypt from './utils/crypt';
import uuid from './utils/uuid';

export default function useStylist(style: any, name?: string) {
  const theme = useTheme();
  const { web, native } = Platform;
  const { current: id } = useRef(uuid());

  style = typeof style === 'function' ? style(theme) : style;

  const isObject = style && typeof style === 'object';
  const styleX = isObject ? jss({ theme }, style) : style;
  const isEmpty = isObject ? Object.keys(style).length === 0 : `${style || ''}`.trim();

  const uid = name ?? (isObject ? JSON.stringify(styleX) : id);
  const hash = isEmpty ? '' : 'rbk-' + crypt(uid);

  useEffect(() => {
    if (!web || isEmpty) return;

    const element = document.getElementById(hash) || document.createElement('style');
    const cssStyle = (typeof styleX === 'string' ? styleX : css(styleX, global ? '::root' : `.${name}`))
      .replace(/[\n\r]|\s{2,}/g, '')
      .replace(/\s?{/g, '{')
      .replace(/}\s?/g, '} ')
      .trim();

    if (element.textContent !== cssStyle) {
      element.id = hash;
      element.textContent = cssStyle;
    }

    if (name) {
      document.head.append(element);
    } else {
      document.body.append(element);
    }
  }, [name, styleX]);

  if (isEmpty) {
    return native ? {} : '';
  }

  return native ? styleX : name;
}
