export default function css(style: any) {
  let result = '';

  if (style && typeof style === 'object') {
    Object.entries(style).forEach(([attr, val]) => {
      if ([undefined, null].includes(val as any)) return;

      let suffix = '';
      if (val && typeof val === 'number' && attr !== 'lineHeight') {
        suffix = 'px';
      }

      if (attr === 'content') {
        val = `'${((val as any) || '').replace(/'/g, "\\'")}'`;
      }

      attr = attr.replace(/[A-Z]/g, (a) => '-' + a.toLowerCase());

      result += `${attr}:${val}${suffix};\n`;
    });
  }

  return result || style;
}
