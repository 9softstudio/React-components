const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const environment = {
    development: 'development',
    production: 'production'
}

module.exports = env => {
    env = environment[env] || environment.development;

    const webpackConfig = {
        context: path.resolve(__dirname, "./"),
        mode: env,
        stats: { modules: false },
        resolve: { extensions: [".js", ".jsx"] },
        entry: {
            'app': './example/app.js',
            'style': './src/style/react-datepicker.scss'
        },
        output: {
            path: path.resolve(__dirname, './example/dist'),
            filename: "[name].js",
            publicPath: '/example/dist/'
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    use: "babel-loader",
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.s?[ac]ss$/,
                    use: [
                        "style-loader",
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
        ],
        devtool: "source-map",
        devServer: {
            port: 3000,
            hot: true,
            watchContentBase: true
        }
    };

    return webpackConfig;
};