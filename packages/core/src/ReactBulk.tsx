import { createContext, useCallback, useEffect, useState } from 'react';

import BaseNative from './BaseNative';
import BaseWeb from './BaseWeb';
import Platform from './Platform';
import createTheme from './createTheme';
import { RbkTheme, ThemeModeValues, ThemeOptionalProps, ThemeProps } from './types';
import global from './utils/global';

export const Context = createContext<RbkTheme | null>(null);

function ReactBulk({ theme, children }: any) {
  const { web, native } = Platform;

  const [themeState, setThemeState] = useState<ThemeProps>();

  const setTheme = useCallback(
    (theme: ThemeModeValues | ThemeOptionalProps) => {
      theme = typeof theme === 'string' ? { mode: theme } : theme;

      setThemeState((current) => {
        const newTheme = createTheme(theme as ThemeProps, current);
        global.theme = newTheme;
        return newTheme;
      });
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
      {web && <BaseWeb theme={themeState}>{children}</BaseWeb>}
      {native && <BaseNative theme={themeState}>{children}</BaseNative>}
    </Context.Provider>
  );
}

export default ReactBulk;
