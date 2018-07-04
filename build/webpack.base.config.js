const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const {resolve} = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const config = require('../config/config')[NODE_ENV];

    const files = [
        {name: 'index', path: resolve('src', 'pages/demo/index.js'), filename: 'index.html', template: path.resolve('./src/pages/demo/render.js')},
        {name: 'callback', path: resolve('src', 'pages/callback/callback.js'), filename: 'callback.html', template: path.resolve('./src/pages/callback/callback.html')}
    ];

    let entry = {};

    let plugins = [
        new ExtractTextPlugin({
            filename: 'dist/stylesheets/[name].[contenthash].css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.API_DOMAIN': JSON.stringify(config.API_DOMAIN),
            'process.env.ORIGIN_URL': JSON.stringify(config.ORIGIN_URL),
            'process.env.ACCOUNT_URL': JSON.stringify(config.ACCOUNT_URL),
            'process.env.ACCOUNT_JS_SDK': JSON.stringify(config.ACCOUNT_JS_SDK),
            'process.env.MT_ACCOUNT': config.MT_ACCOUNT,
            'process.env.ACCOUNT_CALLBACK': JSON.stringify(config.ACCOUNT_CALLBACK),
            'process.env.ACCOUNT_LOGIN': JSON.stringify(config.ACCOUNT_LOGIN)
        })
    ];

    files.forEach((item) => {
        entry[item.name] = item.path;
        plugins.push(
            new HtmlWebpackPlugin({
                filename: item.filename,
                template: item.template,
                chunks: [item.name],
                hash: false,
                inject: 'body',
                xhtml: false,
                minify: {
                    removeComments: true,
                }
            })
        );
    });


    const webpackConfig = {
        entry,
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
        plugins,
        resolve: {
            alias: {
                app: resolve('src/app/index.js'),
                layout: resolve('src/layout/index.js'),
                resources_modules: resolve('src/modules/'),
                resources_api: resolve('src/api/'),
                resources_const: resolve('src/const/'),
                resources_utils: resolve('src/utils/'),
                resources_template: resolve('src/template/'),
                resources_scss: resolve('src/scss/')
            },
        },
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