'use strict';

const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(SRC_DIR, 'app/index.js'),
    output: {
        filename: '[name].bundle.js',
        path: DIST_DIR,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                loader: 'babel-loader',
            },
            {
                test: /\.s?css$/i,
                sideEffects: true,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({}),
                                require('cssnano')({ preset: 'default' })
                            ],
                            minimize: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: 'src/',
        port: 3000,
        overlay: true,
        watchContentBase: true,
        //quiet: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(SRC_DIR, 'index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
    ]

};