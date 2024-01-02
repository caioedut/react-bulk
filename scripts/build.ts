import { cpSync, existsSync, readdirSync, rmSync } from 'fs';
import pmex from 'pmex';

pmex('clean');

pmex('lerna exec --parallel -- tsc --build --force');

const packages = readdirSync('packages', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dir) => dir.name);

packages.forEach((dir) => {
  const baseDir = `packages/${dir}`;
  const distDir = `${baseDir}/dist`;
  const subDir = `${distDir}/${dir}/src`;

  if (existsSync(subDir)) {
    cpSync(subDir, distDir, { recursive: true, force: true });

    packages.forEach((item) => {
      if (existsSync(`${distDir}/${item}`)) {
        rmSync(`${distDir}/${item}`, { recursive: true, force: true });
      }
    });
  }

  //     copyFileSync('README.md', `${baseDir}/dist/README.md`);
  //     copyFileSync(`${baseDir}/package.json`, `${baseDir}/dist/package.json`);
});
