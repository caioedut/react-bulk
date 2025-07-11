import { cpSync, readdirSync, rmSync } from 'fs';
import { globSync } from 'glob';
import pmex from 'pmex';

pmex('lerna exec --parallel -- pkgroll --clean-dist');

const packages = readdirSync('packages', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dir) => dir.name);

packages.forEach((dir) => {
  globSync('./*.md').forEach((file) => {
    cpSync(file, `packages/${dir}/${file}`);
  });
});

/**
 * @hack fix build for expo
 */
const expoDir = './packages/expo';
rmSync(`${expoDir}/dist`, { force: true, recursive: true });
cpSync(`${expoDir}/src/index.ts`, `${expoDir}/dist/index.js`);
cpSync(`${expoDir}/src/index.ts`, `${expoDir}/dist/index.d.ts`);
cpSync(`${expoDir}/src/platform/index.ts`, `${expoDir}/dist/platform/index.js`);
cpSync(`${expoDir}/src/platform/index.ts`, `${expoDir}/dist/platform/index.d.ts`);
cpSync(`${expoDir}/src/platform/index.web.ts`, `${expoDir}/dist/platform/index.web.js`);
cpSync(`${expoDir}/src/platform/index.web.ts`, `${expoDir}/dist/platform/index.web.d.ts`);
