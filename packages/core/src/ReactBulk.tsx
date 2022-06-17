import { createContext, useContext, useEffect, useState } from 'react';

import { ThemeProps } from '../types';
import BaseStyleNative from './BaseStyleNative';
import BaseStyleWeb from './BaseStyleWeb';
import Platform from './Platform';
import createTheme from './createTheme';
import light from './themes/light';

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

  const [themeState, setThemeState] = useState(createTheme(theme));

  const setTheme = (theme: ThemeProps) => {
    setThemeState(createTheme(theme));
  };

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <Context.Provider value={{ ...themeState, setTheme }}>
      {web && <BaseStyleWeb />}
      {native && <BaseStyleNative />}
      {children}
    </Context.Provider>
  );
}

export default ReactBulk;
