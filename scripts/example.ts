import { cpSync, rmSync } from 'fs';
import pmex from 'pmex';

const isNative = process.argv.includes('--native');
const isWeb = process.argv.includes('--web') || !isNative;

if (isWeb && isNative) {
  throw new Error('Choose --web or --native, not both.');
}

const platform = isNative ? 'native' : 'web';
const cwd = `./examples/${platform}`;

pmex('yarn build');

pmex(`yarn --cwd ${cwd} install`);

rmSync(`${cwd}/node_modules/@react-bulk/core/dist`, {
  force: true,
  recursive: true,
});

rmSync(`${cwd}/node_modules/@react-bulk/${platform}/dist`, {
  force: true,
  recursive: true,
});

cpSync('./packages/core/dist', `${cwd}/node_modules/@react-bulk/core/dist`, {
  force: true,
  recursive: true,
});

cpSync(`./packages/${platform}/dist`, `${cwd}/node_modules/@react-bulk/${platform}/dist`, {
  force: true,
  recursive: true,
});

if (isWeb) {
  pmex(`yarn --cwd ${cwd} vite dev --force`);
}

if (isNative) {
  pmex(`yarn --cwd ${cwd} expo start -c`);
}
