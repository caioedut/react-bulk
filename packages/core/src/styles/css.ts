import uuid from '../utils/uuid';

export default function css(style: any, selector?: string | null) {
  let result = style;

  const isObject = style && typeof style === 'object';

  if (!selector) {
    selector = isObject
      ? Object.entries(style)
          .map(([attr, val]) => `${attr}${val}`)
          .sort()
          .join('')
      : uuid();
  }

  if (selector === 'global') {
    selector = null;
  }

  if (isObject) {
    result = '';

    Object.entries(style).forEach(([attr, val]) => {
      if ([undefined, null].includes(val as any)) return;
      if (attr.startsWith('&')) return;

      let suffix = '';
      if (val && typeof val === 'number' && !['opacity', 'lineHeight'].includes(attr)) {
        suffix = 'px';
      }

      if (attr === 'content') {
        val = `'${((val as any) || '').replace(/'/g, "\\'")}'`;
      }

      attr = attr.replace(/[A-Z]/g, (a) => '-' + a.toLowerCase());

      result += `${attr}:${val}${suffix};\n`;
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

  return (result || '')
    .replace(/[\n\r]|\s{2,}/g, '')
    .replace(/\s?{/g, '{')
    .replace(/}\s?/g, '} ')
    .trim();
}
