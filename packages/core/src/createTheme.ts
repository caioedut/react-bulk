import merge from 'deepmerge';

import { ThemeProps } from '../types';
import base from './themes/base';
import dark from './themes/dark';
import light from './themes/light';

export default function createTheme(options: ThemeProps): ThemeProps | any {
  const reference = options?.mode === 'dark' ? dark : light;
  return merge.all([{ mode: 'light' }, base, reference, options || {}]) as ThemeProps;
}
