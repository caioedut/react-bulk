const isProd = typeof process !== 'undefined' && ['prod', 'production'].includes(process?.env?.NODE_ENV as string);

const stdout = {
  log(...args: any[]) {
    !isProd && console.log('React Bulk:', ...args);
  },
  error(...args: any[]) {
    !isProd && console.error('React Bulk:', ...args);
  },
  warn(...args: any[]) {
    !isProd && console.warn('React Bulk:', ...args);
  },
};

export default stdout;
