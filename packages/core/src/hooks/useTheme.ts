import { useContext } from 'react';

import { RbkTheme } from '@react-bulk/core';

import { Context, defaultTheme } from '../ReactBulk';

export default function useTheme(): RbkTheme {
  return useContext(Context) || defaultTheme;
}
