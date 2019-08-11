/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-10 17:12:18
 * @LastEditTime: 2019-08-11 16:41:14
 * @LastEditors: Please set LastEditors
 */
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const path = require('path');
const timeDelay = 5
const timeDelayInMs = timeDelay * 1000

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        before: function (app, server) {
            app.get('/some/path', function (req, res) {
                setTimeout(() => {
                    res.json({ custom: 'response' });
                }, timeDelayInMs)
            });
        }
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    externals: {
        vue: 'Vue',
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name: 'imgs/[name].[ext]',
                            // publicPath: '../'
                        },
                    },
                ],
            },
        ],
    },
    mode: 'development',
});
