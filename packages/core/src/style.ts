import mergeStyles from './mergeStyles';

export const spacings = ['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'];

export default function style(...styles: Object[]) {
  const merged = mergeStyles(styles);

  for (const attr of Object.keys(merged)) {
    let prop = attr;

    // @ts-ignore
    let value = merged[attr];

    if (spacings.includes(attr)) {
      prop = attr
        .replace(/^(.)t$/, '$1Top')
        .replace(/^(.)b$/, '$1Bottom')
        .replace(/^(.)l$/, '$1Left')
        .replace(/^(.)r$/, '$1Right')
        .replace(/^(.)x$/, '$1Horizontal')
        .replace(/^(.)y$/, '$1Vertical')
        .replace(/^m/, 'margin')
        .replace(/^p/, 'padding')
        .replace(/^t$/, 'top')
        .replace(/^b$/, 'bottom')
        .replace(/^l$/, 'left')
        .replace(/^r$/, 'right');

      // @ts-ignore
      delete merged[attr];
    }

    // if (attr.toLowerCase().includes('color')) {}

    // if (attr === 'border') {}

    if (attr === 'bg') {
      prop = 'backgroundColor';
    }

    // @ts-ignore
    merged[prop] = value;
  }

  return merged;
}
