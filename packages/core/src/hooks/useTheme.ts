import { useContext } from 'react';

import RbkContext from '../RbkContext';
import createTheme from '../createTheme';
import { RbkTheme } from '../types';
import global from '../utils/global';

export default function useTheme(): RbkTheme {
  const theme = useContext(RbkContext)?.theme;

  if (!theme && !Object.keys(global.theme).length) {
    createTheme();
  }

  return theme || global.theme;
}
