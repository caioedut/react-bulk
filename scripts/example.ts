import { cpSync, rmSync } from 'fs';
import pmex from 'pmex';

const isNative = process.argv.includes('--native');
const isWeb = process.argv.includes('--web') || !isNative;

if (isWeb && isNative) {
  throw new Error('Choose --web or --native, not both.');
}

const platform = isNative ? 'native' : 'web';
const cwd = `./examples/${platform}`;

pmex('build');

pmex(
  {
    bun: 'install',
    npm: 'install && npm prune',
    pnpm: 'install --fix-lockfile',
    yarn: 'install --check-files',
  },
  { cwd },
);

const packages = ['core', platform];

for (const pkg of packages) {
  rmSync(`${cwd}/node_modules/@react-bulk/${pkg}`, {
    force: true,
    recursive: true,
  });

  cpSync(`./packages/${pkg}/dist`, `${cwd}/node_modules/@react-bulk/${pkg}/dist`, {
    force: true,
    recursive: true,
  });

  cpSync(`./packages/${pkg}/package.json`, `${cwd}/node_modules/@react-bulk/${pkg}/package.json`, {
    force: true,
  });
}

if (isWeb) {
  pmex('vite dev --force', { cwd });
}

if (isNative) {
  pmex('dlx expo start -c', { cwd });
}
