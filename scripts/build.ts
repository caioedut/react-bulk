import { cpSync, readdirSync } from 'fs';
import { globSync } from 'glob';
import pmex from 'pmex';

pmex('clean');

pmex('lerna exec --parallel -- parcel build --no-cache');

const packages = readdirSync('packages', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dir) => dir.name);

packages.forEach((dir) => {
  globSync('./*.md').forEach((file) => {
    cpSync(file, `packages/${dir}/${file}`);
  });
});
