import { ThemeProps } from '../../types';
import Platform from '../Platform';
import get from '../props/get';
import merge from '../props/merge';
import remove from '../props/remove';
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
