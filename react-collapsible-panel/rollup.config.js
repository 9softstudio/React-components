module.exports = {
    output: {
        globals: {
            "react": 'React',
            "react-dom": 'ReactDOM',
            "prop-types": 'PropTypes'
        }
    },
    external: ['react', 'prop-types', 'react-dom'],
    plugins: [
        require('rollup-plugin-node-resolve')({ jsnext: true, main: true }),
        require('rollup-plugin-replace')({ "process.env.NODE_ENV": JSON.stringify('production') }),
        require('rollup-plugin-commonjs')({ include: 'node_modules/**', sourceMap: false }),
        require('rollup-plugin-babel')({
            babelrc: false,
            presets: ['react', ['env', { modules: false }]],
            plugins: ["external-helpers", "transform-object-rest-spread"],
            exclude: 'node_modules/**'
        })
    ]
};