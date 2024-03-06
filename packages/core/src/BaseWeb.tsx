import { memo } from 'react';

import createMeta from './createMeta';
import createStyle from './createStyle';
import css from './styles/css';
import jss from './styles/jss';
import { AnyObject } from './types';

function BaseWeb({ theme, children }: AnyObject) {
  const scrollBarStyle = css(jss({ theme }, theme.mixins.scroll), 'body');

  createMeta('[charset]', { charset: 'UTF-8' }, false);

  createMeta('[name="viewport"]', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, false);

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
        font-size: ${theme.typography.fontSize}px;
        line-height: ${theme.typography.lineHeight};
        height: 100%;
      }

      body {
        background-color: ${theme.colors.background.secondary};
        color: ${theme.colors.text.primary};
        margin: 0;
        padding: 0;

        height: 100%;
        width: 100%;
      }
    `,
  });

  return children;
}

export default memo(BaseWeb);
