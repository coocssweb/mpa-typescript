const merge = require('webpack-merge');
const NODE_ENV = process.env.NODE_ENV = 'test';
const webpackBaseConfig = require('./webpack.test.config')(NODE_ENV);
const webpackConfig = merge(webpackBaseConfig, {

});

module.exports = webpackConfig;
