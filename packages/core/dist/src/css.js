'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function css(style) {
  let result = '';
  if (style && typeof style === 'object') {
    Object.entries(style).forEach(([attr, val]) => {
      if ([undefined, null].includes(val)) return;
      let suffix = '';
      if (val && typeof val === 'number' && ['opacity', 'lineHeight'].includes(attr)) {
        suffix = 'px';
      }
      if (attr === 'content') {
        val = `'${(val || '').replace(/'/g, "\\'")}'`;
      }
      attr = attr.replace(/[A-Z]/g, (a) => '-' + a.toLowerCase());
      result += `${attr}:${val}${suffix};\n`;
    });
  }
  return result || style;
}
exports.default = css;
