// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMessages = require('webpack-messages');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    output: {
        path: path.resolve("./", 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 1234
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),

        new WebpackMessages({
            name: 'client',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

