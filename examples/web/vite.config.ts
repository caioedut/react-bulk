import react from '@vitejs/plugin-react';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const packagesDir = fileURLToPath(new URL('../../packages', import.meta.url)).replace(/\\/g, '/');

// Peer dependencies of @react-bulk/* (react, react-dom...) must be the app's single copy
const peerDependencies = readdirSync(packagesDir).flatMap((name) => {
  const file = `${packagesDir}/${name}/package.json`;
  return existsSync(file) ? Object.keys(JSON.parse(readFileSync(file, 'utf8')).peerDependencies ?? {}) : [];
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Use @react-bulk/* sources directly, so changes in packages show up without a build
    alias: [{ find: /^@react-bulk\/([^/]+)$/, replacement: `${packagesDir}/$1/src/index.ts` }],
    // Regular dependencies (e.g. cometta) come from the repo, peer dependencies from the example
    dedupe: peerDependencies.filter((name, index) => peerDependencies.indexOf(name) === index),
  },
});
