const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const {resolve} = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const config = require('../config/config')[NODE_ENV];

    const webpackConfig = {
        entry: {
            index: resolve('src', 'index.js'),
        },
        output: {
            path: resolve(''),
            publicPath: config.staticPath,
            filename: config.filenameHash ? 'dist/js/[name].[hash:8].js' : 'dist/js/[name].js?[hash:8]' ,
            chunkFilename: config.filenameHash ? 'dist/js/[name].[chunkhash:8].js'  : 'dist/js/[name].js?[chunkhash:8]'
        },
        devtool: config.devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.ejs$/,
                    loader: 'ejs-loader'
                },
                {
                    test: /\.php/,
                    loader: 'ejs-loader'
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 1,
                        publicPath: config.imgPath,
                        name: 'dist/images/[hash:8].[name].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'dist/fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: false,
                                    minimize: true,
                                }
                            },
                            'postcss-loader',
                            "sass-loader?sourceMap",
                        ],
                        fallback: "style-loader"
                    })
                },
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'dist/stylesheets/[name].[contenthash].css',
                allChunks: true
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve('./src/index.html'),
                chunks: ['index'],
                hash: false,
                inject: 'body',
                xhtml: true,
                minify: {
                    removeComments: true,
                }
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
            })
        ]
    };

    if (NODE_ENV !== 'development') {
        webpackConfig.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    dead_code: true
                },
                sourceMap: false,
                output: {
                    comments: false
                }
            })
        );
    }

    // 开发环境服务器配置
    if (NODE_ENV === 'development') {
        webpackConfig.devServer = {
            contentBase: resolve('dist'),
            compress: false,
            host: '127.0.0.1',
            port: config.port,
            hot: true,                                  // 热启动
            disableHostCheck: true,
            historyApiFallback: true
        };
    }

    return webpackConfig;
};