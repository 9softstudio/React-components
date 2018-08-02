import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default () => {
  const scss = {
    file: 'example/example.scss',
    outFile: 'dist/example/example.css'
  }

  const rollup = {
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
      babel({
        babelrc: false,
        presets: ['react', ['env', { modules: false }]],
        plugins: ["external-helpers", "transform-object-rest-spread"],
        exclude: 'node_modules/**'
      })
    ]
  }

  return { scss, rollup }
};