import merge from 'deepmerge';

import base from './themes/base';
import dark from './themes/dark';
import light from './themes/light';

export default function createTheme(options: any = {}) {
  const reference = options.mode === 'dark' ? dark : light;
  const theme: any = merge.all([{ mode: 'light' }, base, reference, options]);

  // theme.style = (...styles: any) => {
  //   // // Send "theme" to functions
  //   // for (let index in styles) {
  //   //   if (typeof styles[index] === 'function') {
  //   //     styles[index] = styles[index](theme);
  //   //   }
  //   // }
  //   //
  //   for (const attr in styles) {
  //     if (['t', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py'].includes(attr)) {
  //       styles[attr] *= 4;
  //     }
  //     //
  //     //   if (attr.toLowerCase().includes('color')) {
  //     //     const colors = Object.keys(theme.colors);
  //     //     const [color, variation = 'main'] = styles[attr].split('.');
  //     //
  //     //     if (colors.includes(color)) {
  //     //       styles[attr] =
  //     //         theme.colors[color]?.[variation] || theme.colors[color]?.primary || theme.colors[color]?.normal || theme.colors[color] || value;
  //     //     }
  //     //   }
  //   }
  //   //
  //   // return jss(styles);
  // };

  return theme;
}
