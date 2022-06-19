import Platform from '../Platform';
import get from '../props/get';
import merge from '../props/merge';
import remove from '../props/remove';
import { ThemeProps } from '../types';
import clone from '../utils/clone';

export const spacings = ['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'];

export const customStyleProps = ['w', 'h', 'bg', 'border', 'shadow', ...spacings];

export default function jss(...mixin: (Object | Array<any> | Function)[]) {
  const { web, native } = Platform;

  const args = clone(mixin);

  const theme: ThemeProps = get('theme', args);
  const webStyle = get('web', args);
  const nativeStyle = get('native', args);

  remove(['theme', 'web', 'native'], args);

  if (theme?.breakpoints) {
    remove(Object.keys(theme.breakpoints), args);
  }

  const styles = merge(args);

  // Web specific
  if (webStyle && Platform.web) {
    Object.assign(styles, webStyle);
  }

  // Native specific
  if (nativeStyle && Platform.native) {
    Object.assign(styles, nativeStyle);
  }

  for (const attr of Object.keys(styles)) {
    let prop: any = attr;
    let value = styles[attr];

    delete styles[attr];

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

      // Theme multiplier
      if (theme?.spacing && typeof value === 'number') {
        value = theme.spacing(value);
      }
    }

    if (attr === 'h') {
      prop = 'height';
    }

    if (attr === 'w') {
      prop = 'width';
    }

    if (attr === 'bg') {
      prop = 'backgroundColor';
    }

    if (attr === 'border') {
      prop = null;

      if (value) {
        const types = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'];
        const split = `${value}`.split(/\s/g).filter((item: string) => item.trim());

        const sizeIndex = split.findIndex((item: string) => /^\d\w*$/.test(item));
        // @ts-ignore
        const borderWidth = sizeIndex >= 0 ? +split.splice(sizeIndex, 1).shift().replace(/\D/g, '') : 1;

        const styleIndex = split.findIndex((item: string) => types.includes(item));
        const borderStyle = styleIndex >= 0 ? split.splice(styleIndex, 1).shift() : 'solid';

        const borderColor = split.shift() || '#000000';

        Object.assign(styles, { borderWidth, borderStyle, borderColor });
      }
    }

    if (web) {
      if (attr === 'paddingVertical') {
        prop = null;
        styles.paddingTop = value;
        styles.paddingBottom = value;
      }

      if (attr === 'paddingHorizontal') {
        prop = null;
        styles.paddingLeft = value;
        styles.paddingRight = value;
      }
    }

    if (native) {
      if (attr === 'shadow' || attr === 'boxShadow') {
        prop = null;

        const colorIndex = value.search(/(\w+\(|#).+/g);

        let color = 'rgba(0, 0, 0, 0)';

        if (colorIndex >= 0) {
          color = value.substring(colorIndex);
          value = value.substring(0, colorIndex);
        }

        const split = value.split(' ').filter((item: any) => item.trim() && !item.includes('inset'));
        const [width, height, shadowRadius] = split.map((item: string) => Number(item.replace(/\D/g, '') || 0));

        Object.assign(styles, {
          shadowColor: color,
          shadowOpacity: 0.18,
          shadowRadius,
          shadowOffset: { height, width },
        });
      }
    }

    if (theme?.colors && (prop || attr).toLowerCase().includes('color')) {
      const colors = Object.keys(theme.colors);
      const [color, variation = 'main'] = `${value || ''}`.split('.');

      if (colors.includes(color)) {
        value = theme.colors[color]?.[variation] || theme.colors[color]?.primary || theme.colors[color] || value;
      }
    }

    if (prop) {
      styles[prop] = value;
    }
  }

  const hasFlex = Object.keys(styles).some((prop) =>
    ['flexDirection', 'flexWrap', 'flexFlow', 'justifyContent', 'justifyItems', 'alignContent', 'alignItems'].includes(prop),
  );

  if (hasFlex && !styles.display) {
    styles.display = 'flex';
  }

  return styles;
}
