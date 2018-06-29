'use strict'
const webpack = require('webpack');
const path = require('path')

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// this is added to babel config to avoid the issue of react-bootstrap inflating the bundle
const transformImports= {
    "react-bootstrap": {
        "transform": "react-bootstrap/es/${member}",
        "preventFullImport": true
    }
};

module.exports = {
    mode: 'production',
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
                options: {
                    presets: ['env', 'react'],
                    plugins: [
                        ["transform-object-rest-spread"],
                        ["transform-imports", transformImports]
                    ]
                }
            }
        ]
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.join(SRC_DIR, 'index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]


}