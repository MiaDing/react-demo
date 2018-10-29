const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: {
        index: "./source/entry.js"
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].js",
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /(\.scss|\.css)$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/source/index.html"
        }),
        new webpack.HotModuleReplacementPlugin({})
    ],
    optimization: {
        splitChunks: {
            chunks: 'initial',
            minSize: 1,
            name: "",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vender"
                },
                common: {
                    test: /[\\/]public[\\/]source[\\/]/,
                    name: "common"
                }
            }
        }
    }
}