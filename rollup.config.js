import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
// const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: {
    index: 'src/index.ts',
    cli: 'src/cli.ts'
  },
  output: [
    {
      // file: pkg.main,
      dir: 'dist',
      format: 'cjs',
      sourcemap: isDev,
      exports: 'auto'
    }
    // { format: 'esm', file: pkg.module, sourcemap: isDev }
  ],

  plugins: [
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.build.json', sourceMap: isDev })
  ],
  external: [...(pkg.dependencies ? Object.keys(pkg.dependencies) : [])]
}

export default config
