import deepmerge from 'deepmerge';

import createStyle from './createStyle';
import extract from './props/extract';
import base from './themes/base';
import dark from './themes/dark';
import light from './themes/light';
import { ThemeOptionalProps, ThemeProps } from './types';
import global from './utils/global';

export default function createTheme(options?: ThemeOptionalProps, extendsTo?: ThemeOptionalProps): ThemeProps | any {
  options = options || {};
  extendsTo = extendsTo || {};

  const mode = options?.mode || extendsTo?.mode || 'light';
  const reference = mode === 'dark' ? dark : light;

  const all = [base, extendsTo, reference, options, { mode }];

  for (const theme of all) {
    if (!theme.colors) continue;

    for (let prop in theme.colors) {
      const color = theme.colors[prop];

      if (typeof color === 'string') {
        theme.colors[prop] = { main: color };
      }

      let main = theme.colors?.[prop]?.main;
      const light = theme.colors?.[prop]?.light;
      const lighter = theme.colors?.[prop]?.lighter;
      const dark = theme.colors?.[prop]?.dark;
      const darker = theme.colors?.[prop]?.darker;

      if (main) {
        if (!light) {
          theme.colors[prop].light = colorize(main, 0.5);
        }

        if (!lighter) {
          theme.colors[prop].lighter = colorize(theme.colors[prop].light, 0.5);
        }

        if (!dark) {
          theme.colors[prop].dark = colorize(main, -0.5);
        }

        if (!darker) {
          theme.colors[prop].darker = colorize(theme.colors[prop].dark, 0.5);
        }
      }
    }
  }

  // @ts-ignore
  const newTheme: ThemeProps = deepmerge.all(all, { arrayMerge: (prev, next) => next });

  const components = { ...newTheme.components };
  const ordered = extract(['Box', 'Text', 'Label', 'Backdrop', 'Scrollable', 'Card', 'Dropdown', 'Button', 'ButtonGroup'], components);
  const list = [...Object.values(ordered), ...Object.values(components)];

  list.forEach((component: any) => {
    const componentName = component?.name;
    const styles = component?.defaultStyles || {};

    if (!componentName) return;

    for (const prop in styles) {
      const style = styles?.[prop];
      const name = componentName + (prop === 'root' ? '' : `-${prop}`);
      global.styles[name] = createStyle({ name, style, theme: newTheme });
    }

    // Generate variant styles
    Object.entries(component?.variants || {}).forEach(([varAttr, varOptions]: any) => {
      Object.entries(varOptions).map(([optionKey, optionVal]: any) => {
        Object.entries(optionVal || {}).forEach(([styleId, style]: any) => {
          const name = `${componentName}-${varAttr}-${optionKey}` + (styleId === 'root' ? '' : `-${styleId}`);
          global.styles[name] = createStyle({ name, style, theme: newTheme });
        });
      });
    });
  });

  global.theme = newTheme;

  return newTheme;
}

function colorize(hex, luminosity = 0) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');

  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // convert to decimal and change luminosity
  let rgb = '#',
    c,
    i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * luminosity), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}
