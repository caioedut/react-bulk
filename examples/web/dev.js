const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

fs.removeSync('yarn.lock');
fs.removeSync('package-lock.json');
fs.removeSync(path.join('node_modules', '@react-bulk'), { recursive: true });

execSync('yarn add file:../../packages/core file:../../packages/web', {
  stdio: 'inherit',
});

execSync('vite', {
  stdio: 'inherit',
});
