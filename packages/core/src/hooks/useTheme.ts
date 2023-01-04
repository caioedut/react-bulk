import { useContext } from 'react';

import { RbkTheme } from '@react-bulk/core';

import { Context } from '../ReactBulk';
import createTheme from '../createTheme';
import global from '../utils/global';

export default function useTheme(): RbkTheme {
  const context = useContext(Context);

  if (!context && !Object.keys(global.theme).length) {
    createTheme();
  }

  return context || global.theme;
}
