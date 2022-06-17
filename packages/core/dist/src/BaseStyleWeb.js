"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const core_1 = require("@react-bulk/core");
function BaseStyleWeb() {
    const theme = (0, core_1.useTheme)();
    (0, react_1.useEffect)(() => {
        (0, core_1.createMeta)('[charset]', { charset: 'UTF-8' }, false);
        (0, core_1.createMeta)('[name="viewport"]', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, false);
    }, []);
    (0, react_1.useEffect)(() => {
        (0, core_1.createMeta)('[name="theme-color"]', {
            name: 'theme-color',
            media: `(prefers-color-scheme: ${theme.mode})`,
            content: getComputedStyle(document.body).backgroundColor,
        }, true);
    }, [theme]);
    const style = `
    *, *:before, *:after {
      box-sizing: border-box;
    }

    html {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Variable", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-size: 16px;
    }

    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-width: 100vw;
      background-color: ${theme.colors.background.secondary};
    }

    body > #root {
      flex: 1;
      display: flex;
      flex-direction: column;
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
    (0, core_1.createStyle)({ style, global: true });
    return null;
}
exports.default = BaseStyleWeb;
