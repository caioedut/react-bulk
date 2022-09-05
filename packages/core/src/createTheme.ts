import deepmerge from 'deepmerge';

import base from './themes/base';
import dark from './themes/dark';
import light from './themes/light';
import { ThemeProps } from './types';

export default function createTheme(options?: ThemeProps, extendsTo?: ThemeProps): ThemeProps | any {
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
      const dark = theme.colors?.[prop]?.dark;

      if (main) {
        if (!light) {
          theme.colors[prop].light = colorize(main, 0.5);
        }

        if (!dark) {
          theme.colors[prop].dark = colorize(main, -0.5);
        }
      }
    }
  }

  return deepmerge.all(all);
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
