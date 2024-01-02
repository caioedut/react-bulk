// import { copyFileSync, readdirSync } from 'fs';
import pmex from 'pmex';

pmex('clean');

pmex('lerna exec --parallel -- tsc --build');

// readdirSync('packages', { withFileTypes: true })
//   .filter((dirent) => dirent.isDirectory())
//   .forEach((dir) => {
//     const baseDir = `packages/${dir.name}`;
//
//     copyFileSync('README.md', `${baseDir}/dist/README.md`);
//     copyFileSync(`${baseDir}/package.json`, `${baseDir}/dist/package.json`);
//   });
