import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import createTheme from './createTheme';
import light from './themes/light';

const ThemeContext = createContext(light);

export function useTheme() {
  return useContext(ThemeContext) || light;
}

function ThemeProvider({ theme, children }: any) {
  const [themeState, setThemeState] = useState(createTheme(theme));

  const setTheme = useCallback(
    (theme: Object) => {
      setThemeState(createTheme(theme));
    },
    [theme],
  );

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider //
      value={{ ...themeState, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
