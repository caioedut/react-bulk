import { useEffect, useRef } from 'react';

import Platform from './Platform';
import css from './styles/css';
import jss from './styles/jss';
import md5 from './utils/md5';
import uuid from './utils/uuid';

export default function createStyle({ style }: any) {
  const { web, native } = Platform;

  const isObject = style && typeof style === 'object';
  const styleX = isObject ? jss(style) : style;

  const hash = md5(
    isObject
      ? Object.entries(styleX)
          .map(([attr, val]) => `${attr}${val}`)
          .sort()
          .join('')
      : uuid(),
  );

  const { current: id } = useRef(`css-${hash}`);

  useEffect(() => {
    if (!web) return;

    const element = document?.getElementById(id) || document?.createElement('style') || {};
    const cssStyle = typeof styleX === 'string' ? styleX : `.${id}{${css(styleX)}}`;

    element.id = id;
    element.textContent = cssStyle
      .replace(/[\n\r]|\s{2,}/g, '')
      .replace(/\s?{/g, '{')
      .replace(/}\s?/g, '} ');

    document?.head?.appendChild(element);
  }, [styleX]);

  return native ? styleX : id;
}
