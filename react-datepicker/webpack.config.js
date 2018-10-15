const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const environment = {
    development: 'development',
    production: 'production'
}

let pathsToClean = ["dist/*.*"];

let cleanOptions = {
    root: path.resolve(__dirname, "."),
    verbose: true,
    dry: false
};

module.exports = env => {
    env = environment[env] || environment.development;
    const isDevBuild = !(env === environment.production);

    const sharedConfig = () => ({
        context: path.resolve(__dirname, "./"),
        mode: env,
        stats: { modules: false },
        resolve: { extensions: [".js", ".jsx"] },
        output: {
            filename: "[name].js",
            publicPath: '/dist/',
            libraryTarget: 'umd',
            library: 'ReactFixedTableHeader'
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /(node_modules|bower_components)/
            }]
        }
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleConfig = merge(sharedConfig(), {
        entry: {
            'index': './src/index.jsx',
            'style': './src/style/_fixed-table-header.scss'
        },
        module: {
            rules: [{
                test: /\.s?[ac]ss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }]
        },
        output: { path: path.resolve(__dirname, "./dist") },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ].concat(isDevBuild ? [] : [new OptimizeCSSAssetsPlugin(), new CleanWebpackPlugin(pathsToClean, cleanOptions), ]),
        devtool: isDevBuild ? "source-map" : undefined,
        externals: isDevBuild ? {} : {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    });

    return clientBundleConfig;
};