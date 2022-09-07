import { createContext, useContext, useEffect, useState } from 'react';

import BaseNative from './BaseNative';
import BaseWeb from './BaseWeb';
import Platform from './Platform';
import createTheme from './createTheme';
import { ThemeMode, ThemeOptionalProps, ThemeProps } from './types';

type ThemeContextValue = ThemeProps & {
  setTheme?: Function;
};

const defaultTheme: ThemeContextValue = createTheme();
const Context = createContext(defaultTheme);

export function useTheme(): ThemeProps {
  return (useContext(Context) || defaultTheme) as any;
}

function ReactBulk({ theme, children }: any) {
  const { web, native } = Platform;

  const [themeState, setThemeState] = useState<ThemeProps>(createTheme(theme));

  const setTheme = (theme: ThemeMode | ThemeOptionalProps) => {
    theme = typeof theme === 'string' ? { mode: theme } : theme;
    setThemeState((current) => createTheme(theme as ThemeProps, current));
  };

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <Context.Provider value={{ ...themeState, setTheme }}>
      {web && <BaseWeb>{children}</BaseWeb>}
      {native && <BaseNative>{children}</BaseNative>}
    </Context.Provider>
  );
}

export default ReactBulk;
