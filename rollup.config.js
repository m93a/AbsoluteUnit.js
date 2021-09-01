import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel'
import babelConfig from './babel.config.json'

import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'


const teserOptions = {
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true
  }
}

const babelOptions = {
  babelHelpers: 'bundled',
  extensions: [ ...DEFAULT_EXTENSIONS, 'ts', 'tsx' ],
  ...babelConfig,
}

const tsOptions = {
  check: true,
  abortOnError: true
}

const tsOptionsDeclaration = {
  ...tsOptions,
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
    }
  }
}

const name = 'AbsoluteUnit'
const input = './src/Unit.ts'

export default [
  // UMD build
  {
    input,
    output: {
      name,
      file: './dist/AbsoluteUnit.js',
      format: 'umd',
    },
    plugins: [
      typescript(tsOptions),
      babel(babelOptions),
      commonjs(),
    ],
  },
  // minified UMD build
  {
    input,
    output: {
      file: './dist/AbsoluteUnit.min.js',
      format: 'umd',
      indent: false,
      name,
    },
    plugins: [
      typescript(tsOptions),
      babel(babelOptions),
      commonjs(),
      terser(teserOptions),
    ],
  },
  // minified UMD build
  {
    input,
    output: {
      file: './dist/AbsoluteUnit.nobabel.min.js',
      format: 'umd',
      indent: false,
      name,
    },
    plugins: [
      typescript(tsOptions),
      terser(teserOptions),
    ]
  },
  // es build
  {
    input,
    output: {
      file: './es/AbsoluteUnit.js',
      format: 'es'
    },
    plugins: [
      typescript(tsOptions),
      babel(babelOptions),
    ]
  },
  // d.ts build
  {
    input,
    output: {
      dir: './types'
    },
    plugins: [
      typescript(tsOptionsDeclaration)
    ]
  },
  // minified es build
  {
    input,
    output: {
      file: './es/AbsoluteUnit.min.js',
      format: 'es',
      indent: false
    },
    plugins: [
      typescript(tsOptions),
      babel(babelOptions),
      terser(teserOptions),
    ]
  },
  // minified es build
  {
    input,
    output: {
      file: './es/AbsoluteUnit.nobabel.min.js',
      format: 'es',
      indent: false
    },
    plugins: [
      typescript(tsOptions),
      terser(teserOptions),
    ]
  }
]
