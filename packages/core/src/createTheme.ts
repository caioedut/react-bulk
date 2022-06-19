import deepmerge from 'deepmerge';

import base from './themes/base';
import dark from './themes/dark';
import light from './themes/light';
import { ThemeProps } from './types';

export default function createTheme(options: ThemeProps, extendsTo?: ThemeProps): ThemeProps | any {
  const mode = options?.mode || extendsTo?.mode || 'light';
  const reference = mode === 'dark' ? dark : light;
  return deepmerge.all([base, extendsTo || {}, reference, options || {}, { mode }]) as ThemeProps;
}
