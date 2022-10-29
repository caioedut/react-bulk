import { useMemo } from 'react';

import createMeta from './createMeta';
import createStyle from './createStyle';
import css from './styles/css';
import jss from './styles/jss';

export default function BaseWeb({ theme, children }) {
  // Run once before render
  useMemo(() => {
    createMeta('[charset]', { charset: 'UTF-8' }, false);
    createMeta('[name="viewport"]', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, false);
  }, []);

  // Run on theme change before render
  useMemo(() => {
    const scrollBarStyle = css(jss({ theme }, theme.mixins.scroll), '*');

    createMeta(
      '[name="theme-color"]',
      {
        name: 'theme-color',
        media: `(prefers-color-scheme: ${theme.mode})`,
        content: getComputedStyle(document.body).backgroundColor,
      },
      true,
    );

    createStyle({
      theme,
      name: 'rbk-global',
      global: true,
      prepend: true,
      style: `
        *,
        *:before,
        *:after {
          box-sizing: border-box;
          font-family: inherit;
        }

        ${scrollBarStyle}

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
      `,
    });
  }, [theme]);

  return children;
}
