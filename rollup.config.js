import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/lengthy.js',
  dest: 'dist/lengthy.cjs.js',
  format: 'cjs',
  moduleName: 'lengthy',
  sourceMap: 'inline',
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        'es2015-rollup',
        'stage-0'
      ]
    })
  ]
}