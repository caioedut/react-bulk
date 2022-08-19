import { useEffect, useMemo, useRef } from 'react';

import Platform from './Platform';
import { useTheme } from './ReactBulk';
import css from './styles/css';
import jss from './styles/jss';
import crypt from './utils/crypt';
import uuid from './utils/uuid';

export type createStyle = {
  style: any;
  className?: string;
  global?: boolean;
};

export default function createStyle({ style, className, global }: createStyle) {
  const theme = useTheme();
  const { web, native } = Platform;

  const isObject = style && typeof style === 'object';
  const styleX = isObject ? jss({ theme }, style) : style;

  const { current: id } = useRef(uuid());

  const hash = useMemo(() => {
    const uid = isObject
      ? Object.entries(styleX)
          .map(([attr, val]) => `${attr}${val}`)
          .sort()
          .join('')
      : id;

    return 'css-' + crypt(uid);
  }, [styleX]);

  className = global ? 'global' : className || hash;

  useEffect(() => {
    if (!web) return;

    const element = document?.getElementById(hash) || document?.createElement('style');
    const cssStyle = (typeof styleX === 'string' ? styleX : css(styleX, `.${className}`))
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

  return native ? styleX : className;
}
