module.exports = {
    production: {
        devtool: false,
        NODE_ENV: 'production',
        API_DOMAIN: 'https://h5api.meitu.com/',
        ORIGIN_URL: '',
        ACCOUNT_URL: 'https://account.meitu.com',
        MT_ACCOUNT: 0,
        ACCOUNT_JS_SDK: 'https://js.app.meitudata.com/account/js-sdk/mt.account.js',
        ACCOUNT_CALLBACK: 'https://h5.meitu.com/services/callback.html',
        ACCOUNT_LOGIN: 'https://account.meitu.com/#!/logout/relogin?client_id=1089867664',
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
        API_DOMAIN: 'http://preh5api.meitu.com/',
        ORIGIN_URL: '',
        ACCOUNT_URL: 'http://preaccount.meitu.com',
        MT_ACCOUNT: 1,
        ACCOUNT_JS_SDK: 'http://prestatic.account.meitu.com/js-sdk/mt.account.js',
        ACCOUNT_CALLBACK: 'http://f2er.meitu.com/services/callback.html',
        ACCOUNT_LOGIN: 'http://preaccount.meitu.com/#!/logout/relogin?client_id=1089867664',
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
        API_DOMAIN: 'http://preh5api.meitu.com/',
        ORIGIN_URL: 'http://h4.meitu.com',
        ACCOUNT_URL: 'http://preaccount.meitu.com',
        MT_ACCOUNT: 1,
        ACCOUNT_JS_SDK: 'http://prestatic.account.meitu.com/js-sdk/mt.account.js',
        ACCOUNT_LOGIN: 'http://preaccount.meitu.com/#!/logout/relogin?client_id=1089867664',
        ACCOUNT_CALLBACK: 'http://h4.meitu.com/services/callback.html',
        jsSourceMap: false,
        cssSourceMap: false,
        eslint: false,
        staticPath: '',
        cssPath: '',
        imgPath: '/',
        filenameHash: false,
    }
};
