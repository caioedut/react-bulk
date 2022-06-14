"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@react-bulk/core");
function CssBase() {
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
  `;
    (0, core_1.createStyle)({ style });
    return null;
}
exports.default = CssBase;
