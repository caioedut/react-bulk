import { useContext } from 'react';

import RbkContext from '../RbkContext';
import createTheme from '../createTheme';
import { RbkTheme } from '../types';
import rbkGlobal from '../utils/global';

export default function useTheme(): RbkTheme {
  const theme = useContext(RbkContext)?.theme;

  if (!theme && !Object.keys(rbkGlobal.theme).length) {
    createTheme();
  }

  return theme || rbkGlobal.theme;
}
