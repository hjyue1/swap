import * as path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import inject from '@rollup/plugin-inject'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import packageJson from './package.json'
import babel from '@rollup/plugin-babel'

const integrityCheck = require('./config/plugins/rollup-integrity-check-plugin')
const {
  SERVICE_WORKER_SOURCE_PATH,
  SERVICE_WORKER_BUILD_PATH,
} = require('./config/constants')

const plugins = [
  json(),
  resolve({
    preferBuiltins: false,
    mainFields: ['module', 'main', 'jsnext:main', 'browser'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  integrityCheck({
    checksumPlaceholder: '<INTEGRITY_CHECKSUM>',
    input: SERVICE_WORKER_SOURCE_PATH,
    output: SERVICE_WORKER_BUILD_PATH,
  }),
  typescript({
    useTsconfigDeclarationDir: true,
  }),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
  }),
]

const terserWrap = (plugins, isEsm = true) => {
  if (process.env.NODE_ENV === 'development') {
    return plugins
  }
  return [
    ...plugins,
    terser({
      module: isEsm,
    }),
  ]
}

const nodePlugin = function () {
  const plugins = [
    json(),
    resolve({
      browser: false,
      preferBuiltins: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        outDir: './node/lib',
      },
    }),
    inject({
      setTimeout: ['timers', 'setTimeout'],
    }),
    commonjs(),
  ]
  if (process.env.NODE_ENV !== 'development') {
    plugins.push(
      terser({
        module: false,
      }),
    )
  }
  return plugins
}

const buildNode = {
  input: 'src/node/index.ts',
  external: [
    'http',
    'https',
    'util',
    'events',
    'tty',
    'os',
    'timers',
    '@mswjs/interceptors',
    '@mswjs/interceptors/lib/interceptors/ClientRequest',
    '@mswjs/interceptors/lib/interceptors/XMLHttpRequest',
  ],
  output: {
    file: 'node/index.js',
    format: 'cjs',
  },
  plugins: nodePlugin(),
}

/**
 * Configuration for the ESM build
 */
const buildEsm = {
  input: [
    // Split modules so they can be tree-shaken
    'src/index.ts',
    'src/rest.ts',
    'src/context/index.ts',
  ],
  output: {
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-deps.js',
    dir: path.dirname(packageJson.module),
    format: 'esm',
  },
  plugins: terserWrap(plugins),
}

/**
 * Configuration for the UMD build
 */
const buildUdm = {
  input: 'src/index.ts',
  output: {
    file: packageJson.main,
    name: 'SwapSW',
    format: 'umd',
    esModule: false,
  },
  plugins: terserWrap(plugins, false),
}

export default [buildNode, buildEsm, buildUdm]
