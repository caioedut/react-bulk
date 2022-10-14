const { execSync } = require('child_process');

execSync('yarn --cwd ../../packages/core link', { stdio: 'inherit' });

execSync('yarn --cwd ../../packages/native link', { stdio: 'inherit' });

execSync('yarn link "@react-bulk/core" "@react-bulk/native"', { stdio: 'inherit' });

execSync('vite', { stdio: 'inherit' });

execSync('expo start', { stdio: 'inherit' });
