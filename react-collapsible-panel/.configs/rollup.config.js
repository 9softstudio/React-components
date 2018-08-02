import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import scss from 'rollup-plugin-scss';

// 'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'
export default (env) => ({
  input: 'src/index.js',
  output: {
    file: `dist/react-collapsible-panel.${env}.js`,
    format: 'umd',
    name: 'ReactCollapsiblePanel',
    globals: {
      react: 'React',
      "prop-types": 'PropTypes'
    }
  },
  external: ['react', 'prop-types'],
  plugins: [
    resolve(),
    scss({
      output: `dist/react-collapsible-panel.${env}.css`,
      outputStyle: env === 'pro' ? 'compressed' : 'expanded'
    }),
    babel({
      babelrc: false,
      presets: ['react', ['env', { modules: false }]],
      plugins: ["external-helpers", "transform-object-rest-spread"],
      exclude: 'node_modules/**'
    }),
    env === 'pro' ? minify() : {},
  ]
});