import { useEffect } from 'react';

import { useTheme } from './ReactBulk';
import createMeta from './createMeta';
import createStyle from './createStyle';

export default function BaseStyleWeb() {
  const theme = useTheme();

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
    const types = ['component', 'custom'];

    types.forEach((type) => {
      const style = document.createElement('style');
      style.dataset.type = type;
      document.head.append(style);
    });
  }, []);

  const style = `
    *, *:before, *:after {
      box-sizing: border-box;
    }

    html {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Variable", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-size: 16px;
      height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      min-height: 100%;
      background-color: ${theme.colors.background.secondary};
      color: ${theme.colors.text.primary};
    }

    body > #root {
      flex: 1;
      display: flex;
      flex-direction: column;
      line-height: 1.15;
      min-height: 100%;
      min-width: 100%;
    }

    ::placeholder {
      color: ${theme.hex2rgba(theme.colors.text.primary, 0.4)}
    }

    :-ms-input-placeholder {
      color: ${theme.hex2rgba(theme.colors.text.primary, 0.4)}
    }

    ::-ms-input-placeholder {
      color: ${theme.hex2rgba(theme.colors.text.primary, 0.4)}
    }
  `;

  const animations = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(359deg); }
    }
  `;

  createStyle({ style, global: true });
  createStyle({ style: animations, global: true });

  return null;
}
