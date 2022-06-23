const path = require('path');
const WebpackMessages = require('webpack-messages');
const NiceWebpackMessages = require('./plugin/NiceWebpackmessages')


module.exports = {
    mode: "development",
    entry: './src/index.ts',
    output: {
        path: path.resolve('./', 'dist'),
    },
    stats: {
        // preset: "normal"
        // preset: "errors-warnings",
        errors: true,
        errorsCount: true,
        warnings: true,
        all: false,
        
    },
    devServer: {
        watchFiles: ['src/*.pug', 'src/*.html'],
        open: true,
        host: 'localhost',
        port: 1234,
        hot: true,
        liveReload: true,
        client: {
            logging: 'none'
        }
    },
    plugins: [
        new NiceWebpackMessages()
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader"
                    }
                ]
            },
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", 'css-loader', 'sass-loader', 'postcss-loader'],
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
    target: 'web'
};

