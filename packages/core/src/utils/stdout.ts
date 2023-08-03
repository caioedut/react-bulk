const isProd = typeof process !== 'undefined' && process?.env?.NODE_ENV === 'production';

const stdout = {
  log(...args) {
    !isProd && console.log(...args);
  },
  error(...args) {
    !isProd && console.error(...args);
  },
  warn(...args) {
    !isProd && console.warn(...args);
  },
};

export default stdout;
