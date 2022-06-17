import { useEffect, useMemo, useRef } from 'react';

import Platform from './Platform';
import { useTheme } from './ReactBulk';
import css from './styles/css';
import jss from './styles/jss';
import md5 from './utils/md5';
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

  const hash = useMemo(
    () =>
      md5(
        isObject
          ? Object.entries(styleX)
              .map(([attr, val]) => `${attr}${val}`)
              .sort()
              .join('')
          : id,
      ),
    [styleX],
  );

  className = global ? 'global' : className || `css-${hash}`;

  useEffect(() => {
    if (!web) return;

    const element = document?.getElementById(hash) || document?.createElement('style') || {};
    const cssStyle = typeof styleX === 'string' ? styleX : css(styleX, `.${className}`);

    if (element) {
      element.id = hash;
      element.textContent = cssStyle;
    }

    document?.head?.appendChild(element);
  }, [styleX]);

  return native ? styleX : className;
}
