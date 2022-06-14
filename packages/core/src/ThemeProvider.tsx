import { createContext, useContext, useEffect, useState } from 'react';

import createTheme from './createTheme';
import light from './themes/light';

const defaultTheme = createTheme(light);
const ThemeContext = createContext(defaultTheme);

export function useTheme() {
  return (useContext(ThemeContext) || defaultTheme) as any;
}

function ThemeProvider({ theme, children }: any) {
  const [themeState, setThemeState] = useState(createTheme(theme));

  const setTheme = (theme: Object) => {
    setThemeState(createTheme(theme));
  };

  useEffect(() => {
    setThemeState(createTheme(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider //
      value={{ ...themeState, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
