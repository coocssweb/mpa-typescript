
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyrightPlugin = require('./plugins/copyrightWebpackPlugin');
const { resolve } = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const config = require('../config')[NODE_ENV];
    const files = require('../config/pages');
    const IS_DEVELOPMENT = NODE_ENV === 'development';
    let entry = {};
    files.forEach((item) => {
        entry[item.name] = item.path;
    });

    const webpackConfig = {
        entry,
        output: {
            path: resolve('./'),
            publicPath: config.staticPath,
            filename: `${config.filePath}js/${config.filenameHash ? '[name].[chunkhash:8]' : '[name]'}.js`,
            chunkFilename: `${config.filePath}js/${config.filenameHash ? '[name].[chunkhash:8]' : '[name]'}.js`
        },
        externals: {},
        devtool: config.devtool,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'awesome-typescript-loader',
                    exclude: /(node_modules)/
                },
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    loader: 'source-map-loader'
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
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 1,
                        publicPath: config.imgPath,
                        name: `${config.filePath}images/${config.filenameHash ? '[name].[hash:8]' : '[name]'}.[ext]`
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'file-loader',
                    query: {
                        publicPath: config.imgPath,
                        name: `${config.filePath}fonts/${config.filenameHash ? '[name].[hash:8]' : '[name]'}.[ext]`
                    }
                },
                {
                    test: /\.scss$/,
                    include: resolve('src'),
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: IS_DEVELOPMENT,
                            },
                        },
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                'process.env.STATIC_PATH': JSON.stringify(config.staticPath),
                'process.env.HOST': JSON.stringify(config.HOST)
            })
        ],
        resolve: {
            alias: {
                '@app': resolve('src/app/index.ts'),
                '@layout': resolve('src/layout/index.js'),
                '@modules': resolve('src/app/modules'),
                '@utils': resolve('src/utils'),
                '@scss': resolve('src/assets/scss')
            },
            extensions: ['.ts', '.js', '.json']
        },
    };

    files.forEach((item) => {
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                filename: item.filename,
                template: item.template,
                chunks: ['manifest', 'vendor', 'app', 'common', item.name],
                hash: false,
                inject: 'body',
                xhtml: false,
                minify: {
                    removeComments: true,
                }
            })
        );
    });

    // 抽离css，命名采用contenthash
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: IS_DEVELOPMENT ? 'style.css' : 'css/[name].[contenthash:8].css',
            chunkFilename: IS_DEVELOPMENT ? '[id].css' : 'css/[id].[contenthash:8].css',
        })
    );

    // 公共代码
    webpackConfig.optimization = {
        splitChunks: {
            cacheGroups: {
                app: {
                    test: /[\\/]src\/app[\\/]/,
                    chunks: 'all',
                    name: 'app',
                    minChunks: 1,
                    priority: 10
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 1,
                    priority: 10
                },
                common: {
                    test: /[\\/]src[\\/]/,
                    chunks: 'all',
                    name: 'common',
                    minChunks: 3,
                    priority: 10
                }
            }
        },
        moduleIds: 'hashed',
        runtimeChunk: {
            name: 'manifest',
        }
    };

    // 开发环境服务器配置
    if (IS_DEVELOPMENT) {
        webpackConfig.devServer = {
            contentBase: resolve('dist'),
            compress: false,
            host: '127.0.0.1',
            port: config.port,
            hot: true,
            disableHostCheck: true,
            historyApiFallback: true
        };

        // webpack watch 配置
        webpackConfig.watchOptions = {
            poll: 500,
            ignored: 'node_modules'
        };
        // 热更新
        webpackConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    } else {
        // 压缩css
        webpackConfig.plugins.push(
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: { safe: true }
            })
        );

        webpackConfig.plugins.push(
            new CopyrightPlugin(`/**\n * 作者: 王佳欣\n * 站点: http://www.shuxia123.com\n */`)
        );
    }
    return webpackConfig;
};
