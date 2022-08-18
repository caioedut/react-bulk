import { Config } from 'bili';

const config: Config = {
  input: './src/index.ts',
  output: {
    minify: true,
    format: 'esm',
    dir: './dist',
    fileName: 'index.js',
  },
};

export default config;
