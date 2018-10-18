var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        'app': './example/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './example/dist')
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /(node_modules)/,
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
    devServer: {
        contentBase: path.join(__dirname, "./example"),
        compress: true,
        port: 9001
    },
    devtool: "source-map",
    watch: true
}