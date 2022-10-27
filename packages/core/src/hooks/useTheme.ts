import { useContext } from 'react';

import { RbkTheme } from '@react-bulk/core';

import { Context } from '../ReactBulk';
import createTheme from '../createTheme';

export default function useTheme(): RbkTheme {
  const context = useContext(Context);

  if (!context && !global.theme) {
    createTheme();
  }

  return context || global.theme;
}
