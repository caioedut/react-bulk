import { MutableRefObject, createContext, createRef, useCallback, useEffect, useState } from 'react';

import { Card, Text } from '@react-bulk/web';

import BaseNative from './BaseNative';
import BaseWeb from './BaseWeb';
import Platform from './Platform';
import Toaster, { ToasterRef } from './Toaster';
import createTheme from './createTheme';
import { RbkTheme, ThemeEditProps, ThemeModeValues, ThemeProps } from './types';
import global from './utils/global';

const toasterRef = createRef<any>();

export const Context = createContext<{
  theme: RbkTheme;
  toasterRef: MutableRefObject<ToasterRef>;
}>({
  theme: {} as RbkTheme,
  toasterRef,
});

function ReactBulk({ theme, children }: any) {
  const { web, native } = Platform;

  const [themeState, setThemeState] = useState<ThemeProps>();

  global.theme = themeState;

  const setTheme = useCallback(
    (theme: ThemeModeValues | ThemeEditProps) => {
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
    <Context.Provider
      value={{
        theme: { ...themeState, setTheme },
        toasterRef,
      }}
    >
      <div style={{}} />
      <Card />
      <Text />

      {web && <BaseWeb theme={themeState}>{children}</BaseWeb>}

      {native && <BaseNative theme={themeState}>{children}</BaseNative>}

      <Toaster ref={toasterRef} theme={themeState} />
    </Context.Provider>
  );
}

export default ReactBulk;
