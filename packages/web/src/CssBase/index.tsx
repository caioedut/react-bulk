import { createStyle, useTheme } from '@react-bulk/core';

function CssBase() {
  const theme = useTheme();

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

  createStyle({ style });

  return null;
}

export default CssBase;
