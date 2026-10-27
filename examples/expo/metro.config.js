const { getDefaultConfig } = require('expo/metro-config');

const withReactBulkSource = require('../metro.shared');

module.exports = withReactBulkSource(getDefaultConfig(__dirname), __dirname);
