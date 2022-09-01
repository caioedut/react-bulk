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
      min-height: 100%;
      padding: 0;
    }

    ::placeholder {
      color: ${theme.hex2rgba(theme.colors.text.primary, 0.4)};
    }

    :-ms-input-placeholder {
      color: ${theme.hex2rgba(theme.colors.text.primary, 0.4)};
    }

    ::-ms-input-placeholder {
      color: ${theme.hex2rgba(theme.colors.text.primary, 0.4)};
    }
  `;

  const animations = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(359deg); }
    }
  `;

  createStyle({ type: 'base', style, global: true });
  createStyle({ type: 'base', style: animations, global: true });

  return null;
}
