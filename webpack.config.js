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

