import { createContext, useCallback, useEffect, useState } from 'react';

import BaseNative from './BaseNative';
import BaseWeb from './BaseWeb';
import Platform from './Platform';
import createStyle from './createStyle';
import createTheme from './createTheme';
import extract from './props/extract';
import { RbkTheme, ThemeModeValues, ThemeOptionalProps, ThemeProps } from './types';

if (!global._rbk_styles) {
  global._rbk_styles = {};
}

export const defaultTheme: RbkTheme = createTheme();
export const Context = createContext(defaultTheme);

function ReactBulk({ theme, children }: any) {
  const { web, native } = Platform;

  const [loading, setLoading] = useState(true);
  const [themeState, setThemeState] = useState<ThemeProps>(createTheme(theme));

  const setTheme = useCallback(
    (theme: ThemeModeValues | ThemeOptionalProps) => {
      theme = typeof theme === 'string' ? { mode: theme } : theme;
      setThemeState((current) => createTheme(theme as ThemeProps, current));
    },
    [theme],
  );

  useEffect(() => {
    setTheme(theme);
    setLoading(false);
  }, [theme]);

  const components = { ...themeState.components };
  const ordered = extract(['Box', 'Text', 'Label', 'Backdrop', 'Scrollable', 'Card', 'Dropdown', 'Button', 'ButtonGroup'], components);
  const list = [...Object.values(ordered), ...Object.values(components)];

  list.forEach((component: any) => {
    const componentName = component?.name;
    const styles = component?.defaultStyles || {};

    if (!componentName) return;

    for (const prop in styles) {
      const style = styles?.[prop];
      const name = componentName + (prop === 'root' ? '' : `-${prop}`);
      global._rbk_styles[name] = createStyle({ name, style, theme: themeState });
    }

    // Generate variant styles
    Object.entries(component?.variants || {}).forEach(([varAttr, varOptions]: any) => {
      Object.entries(varOptions).map(([optionKey, optionVal]: any) => {
        Object.entries(optionVal || {}).forEach(([styleId, style]: any) => {
          const name = `${componentName}-${varAttr}-${optionKey}` + (styleId === 'root' ? '' : `-${styleId}`);
          global._rbk_styles[name] = createStyle({ name, style, theme: themeState });
        });
      });
    });
  });

  if (loading) {
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
