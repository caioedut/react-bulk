const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

fs.rmSync('yarn.lock');
fs.rmdirSync(path.join('node_modules'), { recursive: true });

execSync('yarn add file:C:/Development/react-bulk/packages/core file:C:/Development/react-bulk/packages/web', {
  stdio: 'inherit',
});

execSync('vite --host', {
  stdio: 'inherit',
});
