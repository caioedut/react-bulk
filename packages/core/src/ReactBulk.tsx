import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import BaseNative from './BaseNative';
import BaseWeb from './BaseWeb';
import Platform from './Platform';
import createTheme from './createTheme';
import { RbkTheme, ThemeModeValues, ThemeOptionalProps, ThemeProps } from './types';

const defaultTheme: RbkTheme = createTheme();
const Context = createContext(defaultTheme);

export function useTheme(): RbkTheme {
  return useContext(Context) || defaultTheme;
}

function ReactBulk({ theme, children }: any) {
  const { web, native } = Platform;

  const [themeState, setThemeState] = useState<ThemeProps>();

  const setTheme = useCallback(
    (theme: ThemeModeValues | ThemeOptionalProps) => {
      theme = typeof theme === 'string' ? { mode: theme } : theme;
      setThemeState((current) => createTheme(theme as ThemeProps, current));
    },
    [theme],
  );

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  if (!themeState) {
    return null;
  }

  return (
    <Context.Provider value={{ ...themeState, setTheme }}>
      {web && <BaseWeb>{children}</BaseWeb>}
      {native && <BaseNative>{children}</BaseNative>}
    </Context.Provider>
  );
}

export default ReactBulk;
