import { copyFileSync, rmSync } from 'node:fs';
import pmex from 'pmex';

pmex('tsc --build --force');

copyFileSync('dist/expo/src/index.js', 'dist/index.js');
copyFileSync('dist/expo/src/index.web.js', 'dist/index.web.js');
copyFileSync('../native/dist/types.d.ts', 'dist/types.d.ts');
copyFileSync('../native/dist/types.d.ts.map', 'dist/types.d.ts.map');

rmSync('dist/core', { recursive: true });
rmSync('dist/expo', { recursive: true });
rmSync('dist/native', { recursive: true });
rmSync('dist/web', { recursive: true });
