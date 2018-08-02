import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';

export default {
  input: 'example/index.js',
  output: {
    file: 'dist/example/example.js',
    format: 'iife',
    name: 'example',
    globals: {
      "react": 'React',
      "prop-types": 'PropTypes'
    }
  },
  external: ['react', 'prop-types'],
  plugins: [
    resolve(),
    scss({ output: 'dist/example/example.css' }),
    babel({
      babelrc: false,
      presets: ['react', ['env', { modules: false }]],
      plugins: ["external-helpers", "transform-object-rest-spread"],
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};