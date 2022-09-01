import { createContext, useContext, useEffect, useState } from 'react';

import BaseNative from './BaseNative';
import BaseWeb from './BaseWeb';
import Platform from './Platform';
import createTheme from './createTheme';
import light from './themes/light';
import { ThemeProps } from './types';

type ThemeContextValue = ThemeProps & {
  setTheme?: Function;
};

const defaultTheme: ThemeContextValue = createTheme(light);
const Context = createContext(defaultTheme);

export function useTheme() {
  return (useContext(Context) || defaultTheme) as any;
}

function ReactBulk({ theme, children }: any) {
  const { web, native } = Platform;

  const [themeState, setThemeState] = useState<ThemeProps>(createTheme(theme));

  const setTheme = (theme: ThemeProps) => {
    setThemeState((current) => createTheme(theme, current));
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
