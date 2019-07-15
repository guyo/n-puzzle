'use strict';

const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'production',
    entry: path.join(SRC_DIR, 'app' , 'index.js'),
    output: {
        filename: '[name].bundle.js',
        path: DIST_DIR,
    //  publicPath: '/' disabled so path will be relative to index.html
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            plugins: () => [ require('autoprefixer'), require('cssnano') ]
                        }
                    },
                    'sass-loader'

                ]
            }
        ]
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
    },
    performance: {
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(SRC_DIR,'app','index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            deleteOriginalAssets: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name][id].css'
        }),
        new Visualizer()
    ]
};