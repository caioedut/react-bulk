const { execSync } = require('child_process');

execSync('yarn --cwd ../../packages/core link', { stdio: 'inherit' });

execSync('yarn --cwd ../../packages/web link', { stdio: 'inherit' });

execSync('yarn link "@react-bulk/core" "@react-bulk/web"', { stdio: 'inherit' });

execSync('next dev', { stdio: 'inherit' });
