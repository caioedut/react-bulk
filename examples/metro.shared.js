const fs = require('fs');
const path = require('path');

const packagesDir = path.resolve(__dirname, '../packages');
const rootModulesDir = path.resolve(__dirname, '../node_modules');

// Peer dependencies of @react-bulk/* (react, react-native...) must be the app's single copy
const peerDependencies = new Set(
  fs.readdirSync(packagesDir).flatMap((name) => {
    const file = path.join(packagesDir, name, 'package.json');
    return fs.existsSync(file) ? Object.keys(JSON.parse(fs.readFileSync(file, 'utf8')).peerDependencies ?? {}) : [];
  }),
);

function getPackageName(moduleName) {
  const parts = moduleName.split('/');
  return moduleName.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

/**
 * Resolves @react-bulk/* straight from packages/<name>/src, so changes show up without a build.
 * Their peer dependencies are resolved from the example's node_modules (so the app never loads the
 * versions installed in the repo root), while regular dependencies (e.g. cometta) come from the repo.
 */
module.exports = function withReactBulkSource(config, projectRoot) {
  const exampleOrigin = path.join(projectRoot, 'package.json');
  const parentResolveRequest = config.resolver.resolveRequest;

  config.watchFolders = [...(config.watchFolders ?? []), packagesDir, rootModulesDir];
  config.resolver.nodeModulesPaths = [...(config.resolver.nodeModulesPaths ?? []), rootModulesDir];

  config.resolver.resolveRequest = (context, moduleName, platform) => {
    const resolve = parentResolveRequest ?? context.resolveRequest;

    const match = moduleName.match(/^@react-bulk\/([^/]+)$/);
    if (match) {
      return resolve(context, path.join(packagesDir, match[1], 'src'), platform);
    }

    const isPeerDependency = peerDependencies.has(getPackageName(moduleName));
    const isFromPackages = !path.relative(packagesDir, context.originModulePath).startsWith('..');

    if (isPeerDependency && isFromPackages) {
      return resolve({ ...context, originModulePath: exampleOrigin }, moduleName, platform);
    }

    return resolve(context, moduleName, platform);
  };

  return config;
};
