import { rmSync } from 'fs';
import pmex from 'pmex';

const isNative = process.argv.includes('--native');
const isExpo = process.argv.includes('--expo');
const isWeb = process.argv.includes('--web') || (!isNative && !isExpo);

if ([isWeb, isNative, isExpo].filter(Boolean).length > 1) {
  throw new Error('Choose --web, --native or --expo, not multiple.');
}

const platform = isExpo ? 'expo' : isNative ? 'native' : 'web';
const cwd = `./examples/${platform}`;

// Examples resolve @react-bulk/* from packages/*/src (see vite.config.ts and metro.shared.js),
// so drop any copy left in node_modules by older versions of this script
rmSync(`${cwd}/node_modules/@react-bulk`, { force: true, recursive: true });

// Regular dependencies of the packages (e.g. cometta) are resolved from the repo root
pmex('install');

pmex(
  {
    bun: 'install',
    npm: 'install && npm prune',
    pnpm: 'install --fix-lockfile',
    yarn: 'install --check-files',
  },
  { cwd },
);

if (isWeb) {
  pmex('vite dev', { cwd });
} else {
  pmex('dlx expo start -c', { cwd });
}
