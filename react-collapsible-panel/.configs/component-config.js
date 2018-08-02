import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

// 'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'
export default (env) => {
  const scss = {
    file: 'src/scss/styles.scss',
    outFile: `dist/react-collapsible-panel.${env}.css`,
    outputStyle: env === 'pro' ? 'compressed' : 'expanded'
  };

  const rollup = {
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
      babel({
        babelrc: false,
        presets: ['react', ['env', { modules: false }]],
        plugins: ["external-helpers", "transform-object-rest-spread"],
        exclude: 'node_modules/**'
      }),
      env === 'pro' ? minify() : {},
    ]
  }

  return { rollup, scss }
}