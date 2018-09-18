var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

var webpackConfig = {
    entry: {
        'dist/index': './src/index.js',
        'dist/style': './src/style.scss'    
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './'),
        libraryTarget: 'umd',
        library: 'ReactSlider'
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractSass,
        new CleanWebpackPlugin(["dist"], {
            root: process.cwd()
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devtool: "source-map"
}

// webpack production config.
if (process.env.NODE_ENV === 'production') {
    webpackConfig.externals = {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    };
    webpackConfig.plugins.push(new UglifyJSPlugin());

    webpackConfig.watch = false;
    webpackConfig.devtool = undefined;
}

module.exports = webpackConfig;