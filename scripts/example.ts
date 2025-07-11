import { cpSync, rmSync } from 'fs';
import pmex from 'pmex';

const isNative = process.argv.includes('--native');
const isExpo = process.argv.includes('--expo');
const isWeb = process.argv.includes('--web') || (!isNative && !isExpo);

if ([isWeb, isNative, isExpo].filter(Boolean).length > 1) {
  throw new Error('Choose --web, --native or --expo, not multiple.');
}

const platform = isExpo ? 'expo' : isNative ? 'native' : 'web';
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

if (isExpo) {
  pmex('dlx expo start -c', { cwd });
}
