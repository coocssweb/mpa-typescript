/**
 * 入口文件
 * Created by 王佳欣 on 2018/4/14.
 */

const LIFE_CIRCLE = ['beforeCreate', 'create', 'close', 'open'];

function _mixin (destination, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            destination[key] = source[key];
        }
    }
    return destination;
}

function _combine (destination, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (LIFE_CIRCLE.indexOf(key) > -1) {
                let temp = [destination[key], source[key]];
                destination[key] = function () {
                    temp[0].call(source);
                    temp[1].call(source);
                };
            } else {
                destination[key] = source[key];
            }
        }
    }
    return destination;
}

function App (options) {
    this._init(options);
}

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
            /* eslint-disable */
            _czc.push(['_trackEvent', dom, event]);
        },
        // pv统计
        page ({page}) {
            _czc.push(['_trackPageview', page]);
        }
    };

    App.prototype.$tip = function ({message, type, timeout = 2000}) {
        $('body').append(`<div class="global-tip">${message}</div>`);
        setTimeout(() => {
            $('.global-tip').addClass('out').on('animationend webkitAnimationEnd oAnimationEnd', function () {
                $(this).remove();
            });
        }, timeout);
    };

    App.prototype.open = function () {
        if (this.el && this.el.$page) {
            this.el.$page
                .addClass('animating')
                .addClass('open')
                .on('animationend webkitAnimationEnd oAnimationEnd', function () {
                    $(this).addClass('show').removeClass('animating').removeClass('open');
                });
        }
    };

    App.prototype.close = function () {
        if (this.el && this.el.$page) {
            this.el.$page
                .addClass('animating')
                .addClass('close')
                .on('animationend webkitAnimationEnd oAnimationEnd', function () {
                    $(this).removeClass('show').removeClass('animating').removeClass('close');
                });
        }
    };

    App.prototype.beforeCreate = function () {

    };

    App.prototype.create = function () {
        this.beforeCreate();
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

        _combine(
            Sub.prototype,
            extendOptions
        );

        Sub['super'] = Super;
        return Sub;
    };
}

function initMixin (App) {
    App.mixin = function (mixin) {
        _mixin(
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
