module.exports = {
    production: {
        devtool: false,
        NODE_ENV: 'production',
        API_DOMAIN: '',
        ORIGIN_URL: '',
        jsSourceMap: false,
        cssSourceMap: false,
        eslint: false,
        staticPath: '',                         // JS资源cdn路径
        cssPath: '',                            // CSS资源cdn路径
        imgPath: '../../',                      // 图片资源cdn路径
        filenameHash: true,                     // 生成带hash文件名
    },
    test: {
        devtool: false,
        NODE_ENV: 'test',
        API_DOMAIN: '',
        ORIGIN_URL: '',
        jsSourceMap: false,
        cssSourceMap: false,
        eslint: false,
        staticPath: '',
        cssPath: '',
        imgPath: '../../',
        filenameHash: true,
    },
    development: {
        // 开发 devServer 端口
        port: 7777,
        devtool: 'source-map',
        NODE_ENV: 'development',
        ORIGIN_URL: '',
        API_DOMAIN: '',
        jsSourceMap: false,
        cssSourceMap: false,
        eslint: false,
        staticPath: '',
        cssPath: '',
        imgPath: '/',
        filenameHash: false,
    }
};
