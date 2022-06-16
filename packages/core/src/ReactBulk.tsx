import { createContext, useContext, useEffect, useState } from 'react';

import BaseStyleNative from './BaseStyleNative';
import BaseStyleWeb from './BaseStyleWeb';
import Platform from './Platform';
import createTheme from './createTheme';
import light from './themes/light';

const defaultTheme = createTheme(light);
const Context = createContext(defaultTheme);

export function useTheme() {
  return (useContext(Context) || defaultTheme) as any;
}

function ReactBulk({ theme, children }: any) {
  const { web, native } = Platform;

  const [themeState, setThemeState] = useState(createTheme(theme));

  const setTheme = (theme: Object) => {
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
