import Platform from '../Platform';
import extract from '../props/extract';
import merge from '../props/merge';
import remove from '../props/remove';
import { ThemeProps } from '../types';
import clone from '../utils/clone';

export default function jss(...mixin: (Object | Array<any> | Function)[]) {
  const { web, native } = Platform;

  const args = clone(mixin);
  const theme: ThemeProps = extract('theme', args).theme;

  // Extract all web styles
  let webStyle: any = [];
  while (true) {
    const extracted = extract('web', args);
    if (!extracted?.web) break;
    webStyle.push(extracted.web);
  }

  // Extract all native styles
  let nativeStyle: any = [];
  while (true) {
    const extracted = extract('native', args);
    if (!extracted?.native) break;
    nativeStyle.push(extracted.native);
  }

  if (theme?.breakpoints) {
    remove(Object.keys(theme.breakpoints), args);
  }

  // Merge styles with platform specific
  const styles = merge(args, web && webStyle, native && nativeStyle);

  for (const attr of Object.keys(styles)) {
    let prop: any = attr;
    let value = styles[attr];

    const valueTrim = `${value ?? ''}`.trim();
    const valueSplit = valueTrim.split(/\s/g).filter((item: string) => item.trim());

    delete styles[attr];

    // Call function with theme
    if (typeof value === 'function') {
      value = value(theme);
    }

    if (customSpacings.includes(prop)) {
      prop = attr
        .replace(/^i$/, 'inset')
        .replace(/^(.)t$/, '$1Top')
        .replace(/^(.)b$/, '$1Bottom')
        .replace(/^(.)l$/, '$1Left')
        .replace(/^(.)r$/, '$1Right')
        .replace(/^(.)h$/, '$1Horizontal')
        .replace(/^(.)v$/, '$1Vertical')
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

    if (flexAlignProps.includes(prop) && value) {
      value = value
        .replace(/^normal$/, 'stretch')
        .replace(/^start$/, 'flex-start')
        .replace(/^end$/, 'flex-end')
        .replace(/^space/, 'space-between')
        .replace(/^between/, 'space-between')
        .replace(/^around/, 'space-around')
        .replace(/^evenly/, 'space-evenly');
    }

    // Cast REM
    const remRegex = /([+-]?([0-9]*[.])?[0-9]+)rem/gi;
    if (remRegex.test(valueTrim)) {
      value = valueTrim.replace(remRegex, ($x, $1) => {
        const parsed = $x ? theme?.rem?.($1) : 0;
        return native ? parsed : `${parsed}px`;
      });

      if (!isNaN(value)) {
        value = Number(value);
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

        const sizeIndex = valueSplit.findIndex((item: string) => /^\d\w*$/.test(item));
        // @ts-ignore
        const borderWidth = sizeIndex >= 0 ? +valueSplit.splice(sizeIndex, 1).shift().replace(/\D/g, '') : 1;

        const styleIndex = valueSplit.findIndex((item: string) => types.includes(item));
        const borderStyle = styleIndex >= 0 ? valueSplit.splice(styleIndex, 1).shift() : 'solid';

        const borderColor = theme?.color?.(valueSplit.shift() || theme.colors?.common?.black);

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

      if (prop === 'transform' && Array.isArray(value)) {
        const values: string[] = [];

        value.forEach((item) => {
          for (const attr in item) {
            const unit = Array.isArray(item[attr]) ? item[attr].join(', ') : item[attr];
            values.push(`${attr}(${unit})`);
          }
        });

        value = values.join(', ');
      }
    }

    if (native) {
      if (prop === 'margin') {
        const [v1, v2, v3, v4] = valueSplit;

        if (valueSplit.length > 1) {
          prop = null;

          Object.assign(styles, {
            marginTop: v1,
            marginRight: v2 ?? v1,
            marginBottom: v3 ?? v1,
            marginLeft: v4 ?? v2 ?? v1,
          });
        }
      }

      if (prop === 'padding') {
        const [v1, v2, v3, v4] = valueSplit;

        if (valueSplit.length > 1) {
          prop = null;

          Object.assign(styles, {
            paddingTop: v1,
            paddingRight: v2 ?? v1,
            paddingBottom: v3 ?? v1,
            paddingLeft: v4 ?? v2 ?? v1,
          });
        }
      }

      if (prop === 'inset') {
        const [v1, v2, v3, v4] = valueSplit;

        prop = null;

        Object.assign(styles, {
          top: v1,
          right: v2 ?? v1,
          bottom: v3 ?? v1,
          left: v4 ?? v2 ?? v1,
        });
      }

      if (prop === 'placeItems') {
        const [v1, v2] = valueSplit;

        prop = null;

        Object.assign(styles, {
          alignItems: v1,
          justifyItems: v2 ?? v1,
        });
      }

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

    if (prop) {
      if (`${prop || ''}`.toLowerCase().includes('color')) {
        value = theme?.color?.(value) ?? value;
      }

      styles[prop] = value;
    }
  }

  return styles;
}

export const customSpacings = [
  'i',
  't',
  'b',
  'l',
  'r',
  'm',
  'mt',
  'mb',
  'ml',
  'mr',
  'mh',
  'mv',
  'mx',
  'my',
  'p',
  'pt',
  'pb',
  'pl',
  'pr',
  'px',
  'py',
];

export const customStyleProps = ['w', 'h', 'maxw', 'maxh', 'minw', 'minh', 'bg', 'border', 'corners', 'shadow', ...customSpacings];

export const spacings = [
  'position',
  'top',
  'bottom',
  'left',
  'right',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  ...customSpacings,
];

export const flexAlignProps = ['placeItems', 'alignContent', 'alignItems', 'alignSelf', 'justifyContent', 'justifyItems', 'justifySelf'];
