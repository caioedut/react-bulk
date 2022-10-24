import { useEffect, useState } from 'react';

import { useTheme } from './ReactBulk';
import createMeta from './createMeta';
import createStyle from './createStyle';
import extract from './props/extract';

export default function BaseWeb({ children }) {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createMeta('[charset]', { charset: 'UTF-8' }, false);
    createMeta('[name="viewport"]', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, false);
  }, []);

  useEffect(() => {
    createMeta(
      '[name="theme-color"]',
      {
        name: 'theme-color',
        media: `(prefers-color-scheme: ${theme.mode})`,
        content: getComputedStyle(document.body).backgroundColor,
      },
      true,
    );
  }, [theme]);

  useEffect(() => {
    const style = `
      *,
      *:before,
      *:after {
        box-sizing: border-box;
        font-family: inherit;
      }

      html {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Variable", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 16px;
        height: 100%;
      }

      body {
        background-color: ${theme.colors.background.secondary};
        color: ${theme.colors.text.primary};
        line-height: 1.15;
        margin: 0;
        padding: 0;

        height: 100%;
        width: 100%;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(359deg); }
      }
    `;

    createStyle({ name: 'rbk-global', style, theme, global: true });

    const components = { ...theme.components };
    const ordered = extract(['Box', 'Text', 'Label', 'Backdrop', 'Scrollable', 'Card', 'Dropdown', 'Button', 'ButtonGroup'], components);
    const list = [...Object.values(ordered), ...Object.values(components)];

    list.forEach((component: any) => {
      const componentName = component?.name;
      const styles = component?.defaultStyles || {};

      if (!componentName) return;

      for (const prop in styles) {
        const style = styles?.[prop];
        const name = componentName + (prop === 'root' ? '' : `-${prop}`);

        createStyle({ name, style, theme });
      }

      // Generate variant styles
      Object.entries(component?.variants || {}).forEach(([varAttr, varOptions]: any) => {
        Object.entries(varOptions).map(([optionKey, optionVal]: any) => {
          Object.entries(optionVal || {}).forEach(([styleId, styleCss]: any) => {
            createStyle({
              theme,
              style: styleCss,
              name: `${componentName}-${varAttr}-${optionKey}` + (styleId === 'root' ? '' : `-${styleId}`),
            });
          });
        });
      });
    });

    setLoading(false);
  }, [theme]);

  return !loading && children;
}
