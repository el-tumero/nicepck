const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    output: {
        path: path.resolve('./', 'dist'),
    },
    stats: {
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
        // added in index.js
    ],
    module: {
        rules: [
            { // pug
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader"
                    }
                ]
            },
            { // html
                test: /\.html$/,
                loader: 'html-loader'
            },
            { // typescript
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            { // sass
                test: /\.s[ac]ss$/i,
                use: ["style-loader", 'css-loader', 'sass-loader', 'postcss-loader'],
            },
            { // images
                test: /\.(png|jpg|jpeg|svg|ico|gif)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name].[hash:8][ext]'
                }
            },
            { // fonts
                test: /\.(woff2|woff|ttf|svg|eot)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            }

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    target: 'web'
};

