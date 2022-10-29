import uuid from '../utils/uuid';
import { notPxProps } from './constants';

export default function css(style: any, selector?: string) {
  let result = style;

  const isObject = style && typeof style === 'object';

  if (!selector) {
    selector = isObject ? JSON.stringify(style) : uuid();
  }

  if (selector === '::root') {
    selector = undefined;
  }

  if (isObject) {
    result = '';

    Object.entries(style).forEach(([attr, val]) => {
      if ([undefined, null].includes(val as any)) return;
      if (attr.startsWith('&')) return;

      let suffix = '';
      if (val && typeof val === 'number' && !notPxProps.includes(attr)) {
        suffix = 'px';
      }

      if (attr === 'content') {
        val = `'${((val as any) || '').replace(/'/g, "\\'")}'`;
      }

      attr = attr.replace(/[A-Z]/g, (a) => '-' + a.toLowerCase());

      result += `${attr}:${val}${suffix};`;
    });
  }

  if (selector) {
    result = `${selector}{${result}}`;

    if (isObject) {
      Object.entries(style).forEach(([attr, val]) => {
        if (attr.startsWith('&')) {
          attr = attr.substring(1);
          result += css(val, `${selector}${attr}`);
        }
      });
    }
  }

  return (result || '').replace(/\r|\n/g, ' ').replace(/\s{2,}/g, ' ');
}
