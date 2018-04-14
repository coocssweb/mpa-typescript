/**
 * 入口文件
 * Created by 王佳欣 on 2018/4/14.
 */
function App (options) {
    this._init(options);
};

function initEvents (App) {
    // 分享信息
    App.prototype.$share = {
        /**
         * 配置分享信息
         * @param title                     分享标题
         * @param description               分享描述
         * @param thumb                     分享图标
         * @param dom                       触发dom
         * @param success                   分享成功
         * @param cancel                    取消分享
         * @param start                     点击分享
         */
        config ({title, description, thumb, dom}, success, cancel, start) {

        },
        call () {

        }
    };

    // cnzz统计
    App.prototype.$cnzz = {
        // 事件统计
        event ({dom, event}) {

        },
        // pv统计
        page ({page}) {

        }
    };

    // 页面切换
    App.prototype.$page = {
        // 打开页面
        open (complete) {
            complete && complete();
        },
        // 关闭页面
        close (complete) {
            complete && complete();
        }
    };

    App.prototype.close = function () {
        console.log('close');
    };

    App.prototype.open = function () {
        console.log('open');
    };

    App.prototype.create = function () {
        console.log('create App');
    };

    App.prototype.create = function () {
        console.log('create Rest');
    };
};

// 定义App._init
function init (App) {
    App.prototype._init = function (options) {
        this.$options = options;
    };
};

// 定义App.use
function initUse (App) {
    App.use = function (plugin) {
        const installedPlugins = [];
        if (installedPlugins.indexOf(plugin) > -1) {
            return false;
        }

        const args = Array.from(arguments).slice(1);
        args.unshift(this);
        plugin.install.apply(plugin, args);

        return this;
    };
}

function initExtend (App) {
    App.extend = function (extendOptions) {
        extendOptions = extendOptions || {};

        const Super = this;

        const Sub = function (options) {
            this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;

        Sub.options = Object.assign(
            {},
            Super.options,
            extendOptions
        );

        Sub['super'] = Super;
        return Sub;
    };
}

function initMixin (App) {
    App.mixin = function (mixin) {
        App.prototype.create = function () {
            console.log('create Other');
        };
    };
}

init(App);

initEvents(App);

initUse(App);

initExtend(App);

initMixin(App);

export default App;
