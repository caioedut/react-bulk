import Platform from '../Platform';
import get from '../props/get';
import merge from '../props/merge';
import remove from '../props/remove';
import { ThemeProps } from '../types';
import clone from '../utils/clone';

export const spacings = ['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'];

export const customStyleProps = ['w', 'h', 'maxw', 'maxh', 'minw', 'minh', 'bg', 'border', 'corners', 'shadow', ...spacings];

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

    if (spacings.includes(prop)) {
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

    if (prop === 'w') {
      prop = 'width';
    }

    if (prop === 'h') {
      prop = 'height';
    }

    if (prop === 'maxw') {
      prop = 'maxWidth';
    }

    if (prop === 'maxh') {
      prop = 'maxHeight';
    }

    if (prop === 'minw') {
      prop = 'minWidth';
    }

    if (prop === 'minh') {
      prop = 'minHeight';
    }

    if (prop === 'bg') {
      prop = 'backgroundColor';
    }

    if (prop === 'corners') {
      prop = 'borderRadius';
      value = (theme?.shape?.borderRadius ?? 0) * value;
    }

    if (['border', 'borderTop', 'borderBottom', 'borderLeft', 'borderRight'].includes(prop)) {
      prop = null;

      if (value) {
        const types = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'];
        const split = `${value}`.split(/\s/g).filter((item: string) => item.trim());

        const sizeIndex = split.findIndex((item: string) => /^\d\w*$/.test(item));
        // @ts-ignore
        const borderWidth = sizeIndex >= 0 ? +split.splice(sizeIndex, 1).shift().replace(/\D/g, '') : 1;

        const styleIndex = split.findIndex((item: string) => types.includes(item));
        const borderStyle = styleIndex >= 0 ? split.splice(styleIndex, 1).shift() : 'solid';

        // @ts-ignore
        const borderColor = theme.color(split.shift() || '#000000');

        Object.assign(styles, { borderWidth, borderStyle, borderColor });
      }
    }

    if (web) {
      if (prop === 'paddingVertical') {
        prop = null;
        styles.paddingTop = value;
        styles.paddingBottom = value;
      }

      if (prop === 'paddingHorizontal') {
        prop = null;
        styles.paddingLeft = value;
        styles.paddingRight = value;
      }

      if (prop === 'marginVertical') {
        prop = null;
        styles.marginTop = value;
        styles.marginBottom = value;
      }

      if (prop === 'marginHorizontal') {
        prop = null;
        styles.marginLeft = value;
        styles.marginRight = value;
      }
    }

    if (native) {
      if (prop === 'shadow' || prop === 'boxShadow') {
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

    if (theme?.colors && `${prop || ''}`.toLowerCase().includes('color')) {
      // @ts-ignore
      value = theme.color(value);
    }

    if (prop) {
      styles[prop] = value;
    }
  }

  return styles;
}
