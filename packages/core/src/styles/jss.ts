import Platform from '../Platform';
import mergeStyles from '../mergeStyles';

export const spacings = ['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'];

export default function jss(...styles: Object[]) {
  const merged = mergeStyles(styles);

  // Web specific
  if (merged.web && Platform.web) {
    Object.assign(merged, merged.web);
  }

  // Native specific
  if (merged.native && Platform.native) {
    Object.assign(merged, merged.native);
  }

  delete merged.web;
  delete merged.native;

  for (const attr of Object.keys(merged)) {
    let prop = attr;

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

      delete merged[attr];
    }

    // if (attr.toLowerCase().includes('color')) {}

    // if (attr === 'border') {}

    if (attr === 'bg') {
      delete merged[attr];
      prop = 'backgroundColor';
    }

    if (attr === 'border') {
      const types = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'];
      const split = value.split(/\s/g).filter((item: string) => item.trim());

      const sizeIndex = split.findIndex((item: string) => /^\d\w*$/.test(item));
      const borderWidth = sizeIndex >= 0 ? +split.splice(sizeIndex, 1).shift().replace(/\D/g, '') : 1;

      const styleIndex = split.findIndex((item: string) => types.includes(item));
      const borderStyle = styleIndex >= 0 ? split.splice(styleIndex, 1).shift() : 'solid';

      const borderColor = split.shift() || '#000000';

      delete merged[attr];
      Object.assign(merged, { borderWidth, borderStyle, borderColor });
    }

    if (attr === 'shadow' || attr === 'boxShadow') {
      const split = value.split(' ').filter((item: any) => item.trim() && !item.includes('inset'));

      const color = split.pop();
      const [width, height, shadowRadius] = split.map((item: string) => Number(item.replace(/\D/g, '') || 0));

      let elevation;
      if (height >= 12 && shadowRadius >= 16) {
        elevation = 24;
      } else if (height >= 11 && shadowRadius >= 15.19) {
        elevation = 23;
      } else if (height >= 11 && shadowRadius >= 14.78) {
        elevation = 22;
      } else if (height >= 10 && shadowRadius >= 13.97) {
        elevation = 21;
      } else if (height >= 10 && shadowRadius >= 13.16) {
        elevation = 20;
      } else if (height >= 9 && shadowRadius >= 12.35) {
        elevation = 19;
      } else if (height >= 9 && shadowRadius >= 11.95) {
        elevation = 18;
      } else if (height >= 8 && shadowRadius >= 11.14) {
        elevation = 17;
      } else if (height >= 8 && shadowRadius >= 10.32) {
        elevation = 16;
      } else if (height >= 7 && shadowRadius >= 9.51) {
        elevation = 18;
      } else if (height >= 7 && shadowRadius >= 9.11) {
        elevation = 14;
      } else if (height >= 6 && shadowRadius >= 8.3) {
        elevation = 13;
      } else if (height >= 6 && shadowRadius >= 7.49) {
        elevation = 12;
      } else if (height >= 5 && shadowRadius >= 6.68) {
        elevation = 11;
      } else if (height >= 5 && shadowRadius >= 6.27) {
        elevation = 10;
      } else if (height >= 4 && shadowRadius >= 5.46) {
        elevation = 9;
      } else if (height >= 4 && shadowRadius >= 4.65) {
        elevation = 8;
      } else if (height >= 3 && shadowRadius >= 4.65) {
        elevation = 7;
      } else if (height >= 3 && shadowRadius >= 4.25) {
        elevation = 6;
      } else if (height >= 2 && shadowRadius >= 3.84) {
        elevation = 5;
      } else if (height >= 2 && shadowRadius >= 2.62) {
        elevation = 4;
      } else if (height >= 1 && shadowRadius >= 2.22) {
        elevation = 3;
      } else if (height >= 1 && shadowRadius >= 1.41) {
        elevation = 2;
      } else {
        elevation = 1;
      }

      delete merged[attr];

      Object.assign(merged, {
        shadowColor: color,
        shadowOpacity: 0.18,
        shadowRadius,
        shadowOffset: { height, width },
        elevation,
      });
    }

    // @ts-ignore
    merged[prop] = value;
  }

  const hasFlex = Object.keys(merged).some((prop) =>
    ['flexDirection', 'flexWrap', 'flexFlow', 'justifyContent', 'alignContent', 'alignItems'].includes(prop),
  );

  if (hasFlex && !merged.display) {
    merged.display = 'flex';
  }

  return merged;
}
