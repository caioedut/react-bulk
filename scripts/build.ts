import { cpSync, readdirSync, rmSync } from 'fs';
import { globSync } from 'glob';
import pmex from 'pmex';

pmex('clean');

pmex('lerna exec --parallel -- tsc --build');

const packages = readdirSync('packages', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dir) => dir.name);

packages.forEach((dir) => {
  const baseDir = `packages/${dir}`;
  const distDir = `${baseDir}/dist`;
  const subDir = `${distDir}/${dir}/src`;

  globSync(subDir).forEach((dir) => {
    cpSync(dir, distDir, { recursive: true, force: true });
    rmSync(dir, { recursive: true, force: true });
  });

  globSync(`${distDir}/{${packages.join(',')}}`).forEach((dir) => {
    rmSync(dir, { recursive: true, force: true });
  });

  globSync('./*.md').forEach((file) => {
    cpSync(file, `${baseDir}/${file}`);
  });
});
