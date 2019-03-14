'use strict';

const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const transformImports= {
    'react-bootstrap': {
        'transform': 'react-bootstrap/es/${member}',
        'preventFullImport': true
    }
};

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
                test: /\.js?$/,
                include: SRC_DIR,
                loader: 'babel-loader',
                // options: {
                //     presets: ['@babel/env', '@babel/react'],
                //     plugins: [
                //         ['transform-object-rest-spread'],
                //         ['transform-imports", transformImports']
                //     ]
                // }
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