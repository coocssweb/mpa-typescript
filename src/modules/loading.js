/**
 * loading 模块
 * Created by 王佳欣 on 2018/4/3.
 */
import {loadImage} from '../utils';

class Loading {
    constructor (options, cb) {
        this.percent = 0;
        this.images = options.images || [];
        this.hasLoad = false;
        this.loadCb = cb;
        this.$loadingPercent = $('.globalLoading-percent');
        this.$loadingValue = $('.globalLoading-value');
    }

    /**
     * 资源加载完成
     */
    loadOver () {
        this.hasLoad = true;
        $('.globalLoading').fadeOut(300);
        this.loadCb && this.loadCb();
    }

    /**
     * 倒计时
     */
    countdown (timeout) {
        setTimeout(() => {
            this.percent += this.percent > 80 ? (this.hasLoad ? 1 : 0) : 1;
            if (this.percent > 99) {
                this.loadOver();
            } else {
                this.$loadingValue.html(`${this.percent}%`);
                this.$loadingPercent.css('width', `${this.percent}%`);
                this.countdown(this.percent < 80 && !this.hasLoad ? timeout : 30);
            }
        }, timeout);
    }

    init () {
        this.countdown(50);
        loadImage(this.images).then(() => {
            this.hasLoad = true;
        });
    }
};

// install
function install (App, config, loadOver) {
    if (install.installed) {
        return false;
    }

    install.installed = true;

    let loading = new Loading(config, loadOver);

    Object.defineProperty(App.prototype, '$loading', {
        get () {
            return loading;
        }
    });

    Object.defineProperty(App.prototype, '_loading', {
        get () {
            return loading;
        }
    });
}

Loading.install = install;

export default Loading;
