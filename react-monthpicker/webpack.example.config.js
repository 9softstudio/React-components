const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const config = require("./webpack.config");
const devConfig = config("development");

module.exports = merge(devConfig, {
    entry: {
        'app': './example/app.js'
    },
    output: {
        filename: "[name].js",
        publicPath: '/dist/'
    },
    devServer: {
        port: 3001,
        hot: true,
        watchContentBase: true
    }
});