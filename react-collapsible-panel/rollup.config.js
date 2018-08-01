import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import sass from 'rollup-plugin-sass';

const entry = process.env.entry;
const config = entry === 'example'
  ? {
    input: 'example/index.js',
    output: {
      file: 'example/example.min.js',
      format: 'iife',
      name: 'example',
      globals: {
        "react": 'React',
        "prop-types": 'PropTypes'
      }
    }
  } : {
    input: 'src/index.js',
    output: {
      file: 'dist/react-collapsible-panel.min.js',
      format: 'iife',
      name: 'ReactCollapsiblePanel',
      globals: {
        react: 'React',
        "prop-types": 'PropTypes'
      }
    }
  };

export default Object.assign({
  external: ['react', 'prop-types'],
  plugins: [
    resolve(),
    minify(),
    sass({ output: true }),
    babel({
      babelrc: false,
      presets: ['react', ['env', { modules: false }]],
      plugins: ["external-helpers", "transform-object-rest-spread"],
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}, config);