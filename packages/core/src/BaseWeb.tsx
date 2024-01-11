import { memo, useMemo } from 'react';

import cometta from 'cometta';

import createMeta from './createMeta';
import { AnyObject } from './types';

function BaseWeb({ theme, children }: AnyObject) {
  createMeta('[charset]', { charset: 'UTF-8' }, false);

  createMeta('[name="viewport"]', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, false);

  // #HACK
  useMemo(() => {
    const scrollBarStyle = Object.entries(theme.mixins.scroll).map(([selector, styles]) => {
      // @ts-expect-error
      return `${selector.substring(1)} { ${cometta.css(styles)} }`;
    });

    const style = `
*,
*:before,
*:after {
  box-sizing: border-box;
  font-family: inherit;
}

${scrollBarStyle.join(`\n`)}

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
    `;

    let tag = document.querySelector('[data-rbk="global"]');

    if (!tag) {
      tag = document.createElement('style');
      tag.setAttribute('type', 'text/css');
      tag.setAttribute('data-rbk', 'global');
    }

    tag.textContent = style;

    document.head.prepend(tag);
  }, [theme]);

  return children;
}

export default memo(BaseWeb);
