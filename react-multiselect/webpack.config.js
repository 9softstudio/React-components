var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const environment = {
    development: 'development',
    production: 'production'
}

let pathsToClean = ["dist/*.*", "example/dist/*.*"];

let cleanOptions = {
    root: path.resolve(__dirname, "."),
    verbose: true,
    dry: false
};

module.exports = env => {
    env = environment[env] || environment.development;
    const isDevBuild = !(env === environment.production);

    return {
        mode: env,
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
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: '[id].css'
            })
        ].concat(isDevBuild ? [] : [new OptimizeCSSAssetsPlugin(), new CleanWebpackPlugin(pathsToClean, cleanOptions)]),
        devtool: isDevBuild ? "source-map" : undefined,
        watch: isDevBuild,
        externals: isDevBuild ? {} : {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    }
}