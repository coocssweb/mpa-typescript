/**
 * 入口文件
 * Created by 王佳欣 on 2018/4/14.
 */

function _extend (destination, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            destination[key] = source[key];
        }
    }
    return destination;
}

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

    App.prototype.open = function () {
        console.log(this.$router.query);
        if (this.el && this.el.$page) {
            this.el.$page.addClass('animating').addClass('open');
            setTimeout(() => {
                this.el.$page.addClass('show').removeClass('animating').removeClass('open');
            }, 500);
        }
    };

    App.prototype.close = function () {
        if (this.el && this.el.$page) {
            this.el.$page.addClass('animating').addClass('close');
            setTimeout(() => {
                this.el.$page.removeClass('show').removeClass('animating').removeClass('close');
            }, 500);
        }
    };

    App.prototype.beforeCreate = function () {

    };

    App.prototype.create = function () {
        if (this.bindEvent) {
            this.bindEvent();
        }
        this.open();
    };
};

// 定义App._init
function init (App) {
    App.prototype._init = function (options) {
        this.$options = options || this.$options;
        this.beforeCreate();
        this.create();
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

        _extend(
            Sub.prototype,
            extendOptions
        );

        Sub['super'] = Super;
        return Sub;
    };
}

function initMixin (App) {
    App.mixin = function (mixin) {
        _extend(
            App.prototype,
            mixin
        );
    };
}

init(App);

initEvents(App);

initUse(App);

initExtend(App);

initMixin(App);

export default App;
