import * as path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import packageJson from './package.json';
import babel from '@rollup/plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const moveServiceWork = require('./config/plugins/rollup-move-plugin');
const {
  SERVICE_WORKER_SOURCE_PATH,
  SERVICE_WORKER_BUILD_PATH,
} = require('./config/constants');

const varGlobals = {
  'rocket-swap-sw': 'rocket-swap-sw',
  'rocket-swap-sw/node': 'rocket-swap-sw',
  'rocket-swap-jsbridge': 'rocket-swap-jsbridge',
  fs: 'fs',
  path: 'path',
  webpack: 'webpack',
  'webpack-sources': 'webpack-sources',
  axios: 'axios',
};
const external = [
  'rocket-swap-sw',
  'rocket-swap-sw/node',
  'rocket-swap-jsbridge',
  'fs',
  'path',
  'webpack',
  'webpack-sources',
  'axios',
];
const plugins = [
  json(),
  resolve({
    preferBuiltins: false,
    mainFields: ['module', 'main', 'jsnext:main', 'browser'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  moveServiceWork({
    input: SERVICE_WORKER_SOURCE_PATH,
    output: SERVICE_WORKER_BUILD_PATH,
  }),
  typescript({
    useTsconfigDeclarationDir: true,
  }),
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**', // 只编译我们的源代码
  }),
  commonjs(),
  globals(),
  builtins(),
];

const webpackPlugin = function () {
  const plugins = [
    json(),
    resolve({
      preferBuiltins: false,
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    globals(),
    builtins(),
  ];
  if (process.env.NODE_ENV !== 'development') {
    plugins.push(terser());
  }
  return plugins;
};

const terserWrap = (plugins) => {
  if (process.env.NODE_ENV === 'development') {
    return plugins;
  }
  return [
    ...plugins,
    terser(),
  ];
};

/**
 * Configuration for the ESM build
 */
const buildEsm = {
  input: [
    // Split modules so they can be tree-shaken
    'src/index.ts',
    'src/jsbridge.ts',
    'src/waitFor.ts',
  ],
  output: {
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-deps.js',
    dir: path.dirname(packageJson.module),
    format: 'esm',
  },
  external,
  plugins: terserWrap(plugins),
};

/**
 * Configuration for the UMD build
 */
const buildUdm = {
  input: 'src/index.ts',
  output: {
    globals: varGlobals,
    file: packageJson.main,
    format: 'umd',
    name: 'swapSW',
    esModule: false,
  },
  external,
  plugins: terserWrap(plugins),
};

const buildSwWebpackPlugin = {
  input: 'src/plugins/SwWebpackPlugin.ts',
  external,
  output: {
    globals: varGlobals,
    file: 'webpackPlugin/index.js',
    exports: 'auto',
    format: 'cjs',
  },
  plugins: webpackPlugin(),
};

export default [buildEsm, buildUdm, buildSwWebpackPlugin];
