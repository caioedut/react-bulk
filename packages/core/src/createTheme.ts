import merge from 'deepmerge';

import base from './themes/base';
import dark from './themes/dark';
import light from './themes/light';

export default function createTheme(options: any) {
  const reference = options.mode === 'dark' ? dark : light;
  return merge.all([base, reference, options]);
}
