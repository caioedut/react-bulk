import { useEffect, useMemo, useRef } from 'react';

import Platform from './Platform';
import { useTheme } from './ReactBulk';
import css from './styles/css';
import jss from './styles/jss';
import crypt from './utils/crypt';
import uuid from './utils/uuid';

export type createStyle = {
  name?: string;
  style: any;
  global?: boolean;

  /** @deprecated use name instead */
  className?: string;
};

export default function createStyle({ name, style, global, className }: createStyle) {
  const theme = useTheme();
  const { web, native } = Platform;

  style = typeof style === 'function' ? style(theme) : style;

  const isObject = style && typeof style === 'object';
  const styleX = isObject ? jss({ theme }, style) : style;

  const { current: id } = useRef(uuid());

  name = name ?? className;

  const hash = useMemo(() => {
    if (!styleX) return '';

    const uid = name ?? (isObject ? JSON.stringify(styleX) : id);

    return 'css-' + crypt(uid);
  }, [styleX, name, isObject]);

  name = name ?? hash;

  useEffect(() => {
    if (!web || !styleX) return;

    const element = document?.getElementById(hash) || document?.createElement('style');
    const cssStyle = (typeof styleX === 'string' ? styleX : css(styleX, global ? '::root' : `.${name}`))
      .replace(/[\n\r]|\s{2,}/g, '')
      .replace(/\s?{/g, '{')
      .replace(/}\s?/g, '} ')
      .trim();

    if (element.textContent !== cssStyle) {
      element.textContent = cssStyle;
    }

    if (element.id !== hash) {
      element.id = hash;
      document?.head?.appendChild(element);
    }
  }, [styleX]);

  if (!styleX) {
    return native ? {} : '';
  }

  return native ? styleX : name;
}
