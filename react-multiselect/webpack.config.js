var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var webpackConfig = {
    entry: {
        'dist/index': './src/index.jsx',
        'dist/style': './src/style.scss'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './'),
        libraryTarget: 'umd',
        library: 'ReactMultiSelect'
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                      'css-loader?url=false',
                      'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: process.cwd()
        }),
        new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: '[id].css'})
    ],
    devtool: "source-map",
    watch: true
}

// webpack production config.
 if (process.env.NODE_ENV === 'production') {
     webpackConfig.watch = false;
     webpackConfig.devtool = undefined;
 }

module.exports = webpackConfig;