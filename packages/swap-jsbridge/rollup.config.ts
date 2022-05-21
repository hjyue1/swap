import * as path from 'path'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import packageJson from './package.json';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser'

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

const buildEsm = {
  input: [
    'src/index.ts'
  ],
  output: {
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-deps.js',
    dir: path.dirname(packageJson.module),
    format: 'esm',
  },
  plugins: terserWrap(plugins, true)
}

const buildUdm = {
  input: [
    'src/index.ts'
  ],
  output: {
    file: packageJson.main,
    format: 'umd',
    name: 'swap-jsbridge',
    esModule: false,
  },
  
  plugins: terserWrap(plugins, false)
}

export default [buildEsm, buildUdm]